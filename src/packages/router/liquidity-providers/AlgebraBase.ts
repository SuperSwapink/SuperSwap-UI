import { RToken, UniV3Pool } from "../../tines";
import { FeeAmount, TICK_SPACINGS } from "../../v3-sdk";
import { erc20Abi, tickLensAbi } from "../../abi";
import { ChainId } from "../../chain";
import { Token } from "../../currency";
import {
  Address,
  encodeAbiParameters,
  getContractAddress,
  keccak256,
  parseAbiParameters,
  PublicClient,
} from "viem";

import { getCurrencyCombinations } from "../getCurrencyCombinations";
import type { PoolCode } from "../pools/PoolCode";
import { AlgebraPoolCode } from "../pools/AlgebraPool";
import { LiquidityProvider } from "./LiquidityProvider";
import invariant from "tiny-invariant";

interface StaticPool {
  address: Address;
  token0: Token;
  token1: Token;
  fee: FeeAmount;
}

interface V3Pool {
  address: Address;
  token0: Token;
  token1: Token;
  fee: FeeAmount;
  price: bigint;
  activeTick: number;
}

export const NUMBER_OF_SURROUNDING_TICKS = 1000; // 10% price impact

const getActiveTick = (tickCurrent: number, feeAmount: FeeAmount) =>
  typeof tickCurrent === "number" && feeAmount
    ? Math.floor(tickCurrent / TICK_SPACINGS[feeAmount]) *
      TICK_SPACINGS[feeAmount]
    : undefined;

const bitmapIndex = (tick: number, tickSpacing: number) => {
  return Math.floor(tick / tickSpacing / 256);
};

type PoolFilter = { has: (arg: string) => boolean };

export abstract class AlgebraBaseProvider extends LiquidityProvider {
  poolsByTrade: Map<string, string[]> = new Map();
  pools: Map<string, PoolCode> = new Map();

  blockListener?: () => void;
  unwatchBlockNumber?: () => void;

  isInitialized = false;
  factory: Record<number, Address> = {};
  deployer: Record<number, Address> = {};
  initCodeHash: Record<number, string> = {};
  tickLens: Record<number, string> = {};
  fee = FeeAmount.LOWEST;
  abi: any = [];

  constructor(
    chainId: ChainId,
    web3Client: PublicClient,
    factory: Record<number, Address>,
    deployer: Record<number, Address>,
    initCodeHash: Record<number, string>,
    tickLens: Record<number, string>,
    fee: FeeAmount,
    abi: any
  ) {
    super(chainId, web3Client);
    this.factory = factory;
    this.deployer = deployer;
    this.initCodeHash = initCodeHash;
    this.fee = fee;
    this.abi = abi;
    if (
      !(chainId in this.factory) ||
      !(chainId in this.initCodeHash) ||
      !(chainId in tickLens)
    ) {
      throw new Error(
        `${this.getType()} cannot be instantiated for chainid ${chainId}, no factory or initCodeHash`
      );
    }
  }

  async fetchPoolsForToken(
    t0: Token,
    t1: Token,
    excludePools?: Set<string> | PoolFilter
  ): Promise<void> {
    let staticPools = this.getStaticPools(t0, t1);
    if (excludePools)
      staticPools = staticPools.filter((p) => !excludePools.has(p.address));

    console.debug("staticPools v3 base", staticPools.length);

    const globalState = await this.client
      .multicall({
        multicallAddress: this.client.chain?.contracts?.multicall3
          ?.address as Address,
        allowFailure: true,
        contracts: staticPools.map(
          (pool) =>
            ({
              address: pool.address as Address,
              chainId: this.chainId,
              abi: this.abi,
              functionName: "globalState",
            } as const)
        ),
      })
      .catch((e) => {
        console.warn(
          `${this.getLogPrefix()} - INIT: multicall failed, message: ${
            e.message
          }`
        );
        return undefined;
      });

    const existingPools: V3Pool[] = [];

    staticPools.forEach((pool, i) => {
      if (globalState === undefined || !globalState[i]) return;
      const price = (globalState as any)[i].result?.[0];
      const tick = (globalState as any)[i].result?.[1];
      if (!price || price === 0n || typeof tick !== "number") return;
      const activeTick = getActiveTick(tick, pool.fee);
      if (typeof activeTick !== "number") return;
      existingPools.push({
        ...pool,
        price,
        activeTick,
      });
    });

    if (existingPools.length === 0) return;

    const liquidityContracts = this.client.multicall({
      multicallAddress: this.client.chain?.contracts?.multicall3
        ?.address as Address,
      allowFailure: true,
      contracts: existingPools.map(
        (pool) =>
          ({
            chainId: this.chainId,
            address: pool.address as Address,
            abi: [
              {
                inputs: [],
                name: "liquidity",
                outputs: [
                  { internalType: "uint128", name: "", type: "uint128" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "liquidity",
          } as const)
      ),
    });

    const token0Contracts = this.client.multicall({
      multicallAddress: this.client.chain?.contracts?.multicall3
        ?.address as Address,
      allowFailure: true,
      contracts: existingPools.map(
        (pool) =>
          ({
            chainId: this.chainId,
            address: pool.token0.wrapped.address as Address,
            args: [pool.address as Address],
            abi: erc20Abi,
            functionName: "balanceOf",
          } as const)
      ),
    });

    const token1Contracts = this.client.multicall({
      multicallAddress: this.client.chain?.contracts?.multicall3
        ?.address as Address,
      allowFailure: true,
      contracts: existingPools.map(
        (pool) =>
          ({
            chainId: this.chainId,
            address: pool.token1.wrapped.address as Address,
            args: [pool.address as Address],
            abi: erc20Abi,
            functionName: "balanceOf",
          } as const)
      ),
    });

    const minIndexes = existingPools.map((pool) =>
      bitmapIndex(
        pool.activeTick - NUMBER_OF_SURROUNDING_TICKS,
        TICK_SPACINGS[pool.fee]
      )
    );
    const maxIndexes = existingPools.map((pool) =>
      bitmapIndex(
        pool.activeTick + NUMBER_OF_SURROUNDING_TICKS,
        TICK_SPACINGS[pool.fee]
      )
    );

    const wordList = existingPools.flatMap((pool, i) => {
      const minIndex = minIndexes[i];
      const maxIndex = maxIndexes[i];

      return Array.from(
        { length: maxIndex - minIndex + 1 },
        (_, i) => minIndex + i
      ).flatMap((j) => ({
        chainId: this.chainId,
        address: this.tickLens[
          this.chainId as keyof typeof this.tickLens
        ] as Address,
        args: [pool.address, j] as const,
        abi: tickLensAbi,
        functionName: "getPopulatedTicksInWord" as const,
        index: i,
      }));
    });

    const ticksContracts = this.client.multicall({
      multicallAddress: this.client.chain?.contracts?.multicall3
        ?.address as Address,
      allowFailure: true,
      contracts: wordList,
    });

    const [liquidityResults, token0Balances, token1Balances, tickResults] =
      await Promise.all([
        liquidityContracts,
        token0Contracts,
        token1Contracts,
        ticksContracts,
      ]);

    const ticks: NonNullable<(typeof tickResults)[number]["result"]>[] = [];
    tickResults.forEach((t, i) => {
      const index = wordList[i].index;
      ticks[index] = (ticks[index] || []).concat(t.result || []);
    });

    const transformedV3Pools: PoolCode[] = [];
    existingPools.forEach((pool, i) => {
      if (
        !liquidityResults?.[i] ||
        !token0Balances?.[i].result ||
        !token1Balances?.[i].result
      )
        return;
      const balance0 = token0Balances[i].result;
      const balance1 = token1Balances[i].result;
      const liquidity = liquidityResults[i].result;
      if (
        balance0 === undefined ||
        balance1 === undefined ||
        liquidity === undefined
      )
        return;

      const poolTicks = ticks[i]
        .map((tick) => ({
          index: tick.tick,
          DLiquidity: tick.liquidityNet,
        }))
        .sort((a, b) => a.index - b.index);

      const lowerUnknownTick =
        minIndexes[i] * TICK_SPACINGS[pool.fee] * 256 - TICK_SPACINGS[pool.fee];
      console.assert(
        poolTicks.length === 0 || lowerUnknownTick < poolTicks[0].index,
        "Error 236: unexpected min tick index"
      );
      poolTicks.unshift({
        index: lowerUnknownTick,
        DLiquidity: 0n,
      });
      const upperUnknownTick =
        (maxIndexes[i] + 1) * TICK_SPACINGS[pool.fee] * 256;
      console.assert(
        poolTicks[poolTicks.length - 1].index < upperUnknownTick,
        "Error 244: unexpected max tick index"
      );
      poolTicks.push({
        index: upperUnknownTick,
        DLiquidity: 0n,
      });
      //console.log(pool.fee, TICK_SPACINGS[pool.fee], pool.activeTick, minIndexes[i], maxIndexes[i], poolTicks)

      const v3Pool = new UniV3Pool(
        pool.address,
        pool.token0 as RToken,
        pool.token1 as RToken,
        pool.fee / 1_000_000,
        balance0,
        balance1,
        pool.activeTick,
        liquidity,
        pool.price,
        poolTicks
      );

      const pc = new AlgebraPoolCode(
        v3Pool,
        this.getType(),
        this.getPoolProviderName()
      );
      transformedV3Pools.push(pc);
      this.pools.set(pool.address.toLowerCase(), pc);
    });

    this.poolsByTrade.set(
      this.getTradeId(t0, t1),
      transformedV3Pools.map((pc) => pc.pool.address.toLowerCase())
    );
  }

  getStaticPools(t1: Token, t2: Token): StaticPool[] {
    const currencyCombinations = getCurrencyCombinations(this.chainId, t1, t2);

    return currencyCombinations.map(([currencyA, currencyB]) => ({
      address: this.computePoolAddress({
        factoryAddress:
          this.deployer[this.chainId as keyof typeof this.deployer],
        tokenA: currencyA.wrapped,
        tokenB: currencyB.wrapped,
        initCodeHashManualOverride:
          this.initCodeHash[this.chainId as keyof typeof this.initCodeHash],
      }) as Address,
      token0: currencyA,
      token1: currencyB,
      fee: this.fee,
    }));
  }

  computePoolAddress({
    factoryAddress,
    tokenA,
    tokenB,
    initCodeHashManualOverride,
  }: {
    factoryAddress: string;
    tokenA: Token;
    tokenB: Token;
    initCodeHashManualOverride: string;
  }) {
    const [token0, token1] = tokenA.sortsBefore(tokenB)
      ? [tokenA, tokenB]
      : [tokenB, tokenA]; // does safety checks
    invariant(token0.chainId === token1.chainId, "CHAIN_ID");
    return getContractAddress({
      from: factoryAddress as `0x${string}`,
      bytecodeHash: initCodeHashManualOverride as `0x${string}`,
      salt: keccak256(
        encodeAbiParameters(parseAbiParameters("address, address"), [
          token0.address,
          token1.address,
        ])
      ),
      opcode: "CREATE2",
    });
  }

  startFetchPoolsData() {
    this.stopFetchPoolsData();
    // this.topPools = new Map()
    this.unwatchBlockNumber = this.client.watchBlockNumber({
      onBlockNumber: (blockNumber) => {
        this.lastUpdateBlock = Number(blockNumber);
        // if (!this.isInitialized) {
        //   this.initialize()
        // } else {
        //   this.updatePools()
        // }
      },
      onError: (error) => {
        console.error(
          `${this.getLogPrefix()} - Error watching block number: ${
            error.message
          }`
        );
      },
    });
  }

  getCurrentPoolList(): PoolCode[] {
    // const tradeId = this.getTradeId(t0, t1)
    // const poolsByTrade = this.poolsByTrade.get(tradeId) ?? []
    // return poolsByTrade
    //   ? Array.from(this.pools)
    //       .filter(([poolAddress]) => poolsByTrade.includes(poolAddress))
    //       .map(([, p]) => p)
    //   : []
    return Array.from(this.pools.values());
  }

  stopFetchPoolsData() {
    if (this.unwatchBlockNumber) this.unwatchBlockNumber();
    this.blockListener = undefined;
  }
}

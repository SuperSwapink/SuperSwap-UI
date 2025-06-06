import { RToken, UniV3Pool } from "../../tines";
import { FeeAmount, computePoolAddress } from "../../v3-sdk";
import { erc20Abi, tickLensAbi } from "../../abi";
import { ChainId } from "../../chain";
import { Currency, Token, Type } from "../../currency";
import {
  Address,
  encodeAbiParameters,
  encodePacked,
  Hex,
  keccak256,
  PublicClient,
} from "viem";

import { getCurrencyCombinations } from "../getCurrencyCombinations";
import type { PoolCode } from "../pools/PoolCode";
import { UniV3PoolCode } from "../pools/UniV3Pool";
import { LiquidityProvider } from "./LiquidityProvider";

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
  sqrtPriceX96: bigint;
  activeTick: number;
}

const TICK_SPACINGS: { [_amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 100,
  [FeeAmount.MEDIUM]: 200,
  [FeeAmount.HIGH]: 2000,
};

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

export abstract class VelodrmoeV3BaseProvider extends LiquidityProvider {
  poolsByTrade: Map<string, string[]> = new Map();
  pools: Map<string, PoolCode> = new Map();

  blockListener?: () => void;
  unwatchBlockNumber?: () => void;

  isInitialized = false;
  factory: Record<number, Address> = {};
  implementation: Record<number, Address> = {};
  initCodeHash: Record<number, string> = {};
  tickLens: Record<number, string> = {};

  constructor(
    chainId: ChainId,
    web3Client: PublicClient,
    factory: Record<number, Address>,
    initCodeHash: Record<number, string>,
    tickLens: Record<number, string>,
    implementation: Record<number, Address>
  ) {
    super(chainId, web3Client);
    this.factory = factory;
    this.initCodeHash = initCodeHash;
    this.implementation = implementation;
    this.tickLens = tickLens;
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

    const slot0 = await this.client
      .multicall({
        multicallAddress: this.client.chain?.contracts?.multicall3
          ?.address as Address,
        allowFailure: true,
        contracts: staticPools.map(
          (pool) =>
            ({
              address: pool.address as Address,
              chainId: this.chainId,
              abi: [
                {
                  inputs: [],
                  name: "slot0",
                  outputs: [
                    {
                      internalType: "uint160",
                      name: "sqrtPriceX96",
                      type: "uint160",
                    },
                    { internalType: "int24", name: "tick", type: "int24" },
                    {
                      internalType: "uint16",
                      name: "observationIndex",
                      type: "uint16",
                    },
                    {
                      internalType: "uint16",
                      name: "observationCardinality",
                      type: "uint16",
                    },
                    {
                      internalType: "uint16",
                      name: "observationCardinalityNext",
                      type: "uint16",
                    },
                    { internalType: "bool", name: "unlocked", type: "bool" },
                  ],
                  stateMutability: "view",
                  type: "function",
                },
              ],
              functionName: "slot0",
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
      if (slot0 === undefined || !slot0[i]) return;
      const sqrtPriceX96 = slot0[i].result?.[0];
      const tick = slot0[i].result?.[1];
      if (!sqrtPriceX96 || sqrtPriceX96 === 0n || typeof tick !== "number")
        return;
      const activeTick = getActiveTick(tick, pool.fee);
      if (typeof activeTick !== "number") return;
      existingPools.push({
        ...pool,
        sqrtPriceX96,
        activeTick,
      });
    });

    if (existingPools.length === 0) return;

    const fees = await this.client.multicall({
      multicallAddress: this.client.chain?.contracts?.multicall3
        ?.address as Address,
      allowFailure: true,
      contracts: existingPools.map(
        (pool) =>
          ({
            chainId: this.chainId,
            address: this.factory[this.chainId as keyof typeof this.factory],
            abi: [
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "pool",
                    type: "address",
                  },
                ],
                name: "getSwapFee",
                outputs: [
                  {
                    internalType: "uint24",
                    name: "",
                    type: "uint24",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "getSwapFee",
            args: [pool.address],
          } as const)
      ),
    });

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
      const fee = fees[i].result;
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
        Number(fee || pool.fee) / 1_000_000,
        balance0,
        balance1,
        pool.activeTick,
        liquidity,
        pool.sqrtPriceX96,
        poolTicks
      );

      const pc = new UniV3PoolCode(
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

    const allCurrencyCombinationsWithAllFees: [Type, Type, FeeAmount][] =
      currencyCombinations.reduce<[Currency, Currency, FeeAmount][]>(
        (list, [tokenA, tokenB]) => {
          if (tokenA !== undefined && tokenB !== undefined) {
            return list.concat([
              [tokenA, tokenB, FeeAmount.LOWEST],
              [tokenA, tokenB, FeeAmount.LOW],
              [tokenA, tokenB, FeeAmount.MEDIUM],
              [tokenA, tokenB, FeeAmount.HIGH],
            ]);
          }
          return [];
        },
        []
      );

    const filtered: [Token, Token, FeeAmount][] = [];
    allCurrencyCombinationsWithAllFees.forEach(
      ([currencyA, currencyB, feeAmount]) => {
        if (currencyA && currencyB && feeAmount) {
          const tokenA = currencyA.wrapped;
          const tokenB = currencyB.wrapped;
          if (tokenA.equals(tokenB)) return;
          filtered.push(
            tokenA.sortsBefore(tokenB)
              ? [tokenA, tokenB, feeAmount]
              : [tokenB, tokenA, feeAmount]
          );
        }
      }
    );
    return filtered.map(([currencyA, currencyB, fee]) => ({
      address: this._getPoolAddress(currencyA, currencyB, TICK_SPACINGS[fee]),
      token0: currencyA,
      token1: currencyB,
      fee,
    }));
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

  _getPoolAddress(t1: Token, t2: Token, tickSpacing: number): Address {
    const salt = keccak256(
      encodeAbiParameters(
        [{ type: "address" }, { type: "address" }, { type: "int24" }],
        [t1.address, t2.address, tickSpacing]
      )
    );

    let data = `0x0000000000000000000000003d602d80600a3d3981f3363d3d373d3d3d363d73${this.implementation[
      this.chainId as keyof typeof this.implementation
    ]
      .slice(2)
      .toLowerCase()}5af43d82803e903d91602b57fd5bf3ff${this.factory[
      this.chainId as keyof typeof this.factory
    ]
      .slice(2)
      .toLowerCase()}${salt.slice(2).toLowerCase()}`;

    let data1 = keccak256(("0x" + data.slice(26, 136)) as Hex);

    data = `${data}${data1.slice(2)}`;

    const data2 = keccak256(("0x" + data.slice(136, 306)) as Hex);

    return ("0x" + data2.slice(-40)) as Address;
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

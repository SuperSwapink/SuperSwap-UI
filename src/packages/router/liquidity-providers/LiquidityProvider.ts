import { ChainId, chainShortName } from "../../chain";
import type { Token } from "../../currency";
import { PublicClient } from "viem";

import type { PoolCode } from "../pools/PoolCode";

export enum LiquidityProviders {
  InkSwap = "InkSwap",
  InkySwap = "InkySwap",
  SquidSwap = "SquidSwap",
  DyorSwap = "DyorSwap",
  ReservoirSwap = "ReservoirSwap",
  NativeWrap = "NativeWrap",
  VelodromeSwapV2 = "VelodromeSwapV2",
  VelodromeSwapV3 = "VelodromeSwapV3",
  UniswapV2 = "UniswapV2",
  UniswapV3 = "UniswapV3",
  PancakeSwapV2 = "PancakeSwapV2",
  PancakeSwapV3 = "PancakeSwapV3",
  SushiSwapV2 = "SushiSwapV2",
  SushiSwapV3 = "SushiSwapV3",
  AerodromeSwapV2 = "AerodromeSwapV2",
  AerodromeSwapV3 = "AerodromeSwapV3",
  CamelotSwapV2 = "CamelotSwapV2",
  CamelotSwapV3 = "CamelotSwapV3",
  QuickSwapV2 = "QuickSwapV2",
  QuickSwapV3 = "QuickSwapV3",
  KyoFinanceV3 = "KyoFinanceV3",
  Sonex = "Sonex",
  SonusV2 = "SonusV2",
  SonusV3 = "SonusV3",
  LynexV3 = "LynexV3",
  PharaohV2 = "PharaohV2",
  Nile = "Nile",
  SyncSwapV2 = "SyncSwapV2",
  ZKSwapV2 = "ZKSwapV2",
  ZKSwapV3 = "ZKSwapV3",
}

export abstract class LiquidityProvider {
  chainId: ChainId;
  client: PublicClient;
  lastUpdateBlock = 0;
  readonly ON_DEMAND_POOLS_LIFETIME_IN_SECONDS = 60;
  readonly FETCH_AVAILABLE_POOLS_AFTER_SECONDS = 900;

  constructor(chainId: ChainId, client: PublicClient) {
    this.chainId = chainId;
    this.client = client;
  }

  abstract getType(): LiquidityProviders;

  /**
   * The name of liquidity provider to be used for pool naming. For example, 'SushiSwap'
   */
  abstract getPoolProviderName(): string;

  /**
   * Initiates event listeners for top pools
   */
  abstract startFetchPoolsData(): void;

  /**
   * Fetches relevant pools for the given tokens
   * @param t0 Token
   * @param t1 Token
   */
  abstract fetchPoolsForToken(
    t0: Token,
    t1: Token,
    excludePools?: Set<string>
  ): Promise<void>;

  /**
   * Returns a list of PoolCode
   * @param t0 Token
   * @param t1 Token
   * @returns PoolCode[]
   */
  abstract getCurrentPoolList(t0: Token, t1: Token): PoolCode[];

  abstract stopFetchPoolsData(): void;

  /**
   * Returns last processed block number
   * @returns last processed block number
   */
  getLastUpdateBlock(): number {
    return this.lastUpdateBlock;
  }

  /**
   * Logs a message with the following format:
   * <chainId>~<lastUpdateBlock>~<providerName>
   * Example: 1~123456~SushiSwap
   * @returns string
   */
  getLogPrefix(): string {
    return `${chainShortName[this.chainId]}/${this.chainId}~${
      this.lastUpdateBlock
    }~${this.getType()}`;
  }

  getTradeId = (t0: Token, t1: Token) =>
    [t0.address.toLowerCase(), t1.address.toLowerCase()]
      .sort((first, second) => (first > second ? -1 : 1))
      .join(":");
}

import type { MultiRoute, RouteLeg, VeloRPool } from "../../tines";

import { HEXer } from "../HEXer";
import { LiquidityProviders } from "../liquidity-providers";
import { PoolCode } from "./PoolCode";

export class VeloPoolCode extends PoolCode {
  constructor(
    pool: VeloRPool,
    liquidityProvider: LiquidityProviders,
    providerName: string
  ) {
    super(
      pool,
      liquidityProvider,
      `${providerName} ${(pool?.fee || 0) * 100}%`
    );
  }

  getSwapCodeForRouteProcessor(
    leg: RouteLeg,
    _route: MultiRoute,
    to: string
  ): string {
    // swapUniswapPool = 0x20(address pool, address tokenIn, bool direction, address to)
    const code = new HEXer()
      .uint8(10) // swapUniswapPool
      .address(this.pool.address)
      .address(leg.tokenFrom.address)
      .bool(leg.tokenFrom.address === this.pool.token0.address)
      .address(to)
      .toString();
    console.assert(
      code.length === 62 * 2,
      "getSwapCodeForRouteProcessor unexpected code length"
    );
    return code;
  }

  override getSwapCodeForRouteProcessor2(
    leg: RouteLeg,
    _route: MultiRoute,
    to: string
  ): string {
    const code = new HEXer()
      .uint8(0) // uniV2 pool
      .address(this.pool.address)
      .bool(leg.tokenFrom.address === this.pool.token0.address)
      .address(to)
      .uint24(Math.round(leg.poolFee * 1_000_000))
      //.bool(presended)
      .toString();
    return code;
  }

  override getSwapCodeForRouteProcessor4(
    leg: RouteLeg,
    _route: MultiRoute,
    to: string
  ): string {
    const code = new HEXer()
      .uint8(0) // uniV2 pool
      .address(this.pool.address)
      .bool(leg.tokenFrom.address === this.pool.token0.address)
      .address(to)
      .uint24(Math.round(leg.poolFee * 1_000_000)) // new part - before fee was always 0.3%
      .toString();
    return code;
  }
}

import { ChainId } from "../../chain"
import { PublicClient } from "viem"

import { LiquidityProviders } from "./LiquidityProvider"
import { UniswapV3BaseProvider } from "./UniswapV3Base"

export class UniswapV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
    } as const

    const initCodeHash = {
      [ChainId.BASE]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const

    const tickLens = {
      [ChainId.BASE]: "0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d",
    } as const

    super(chainId, web3Client, factory, initCodeHash, tickLens)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.UniswapV3
  }
  getPoolProviderName(): string {
    return "UniswapV3"
  }
}

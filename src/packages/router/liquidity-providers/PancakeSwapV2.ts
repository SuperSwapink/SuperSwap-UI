import { ChainId } from "../../chain"
import { PublicClient } from "viem"

import { LiquidityProviders } from "./LiquidityProvider"
import { UniswapV2BaseProvider } from "./UniswapV2Base"

export class PancakeSwapV2Provider extends UniswapV2BaseProvider {
  override fee: number = 0.0025
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E",
    } as const

    const initCodeHash = {
      [ChainId.BASE]:
        "0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d",
    } as const

    super(chainId, web3Client, factory, initCodeHash)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.PancakeSwapV2
  }
  getPoolProviderName(): string {
    return "PancakeSwapV2"
  }
}

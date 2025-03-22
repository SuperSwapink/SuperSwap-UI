import { ChainId } from "../../chain"
import { PublicClient } from "viem"

import { LiquidityProviders } from "./LiquidityProvider"
import { UniswapV2BaseProvider } from "./UniswapV2Base"

export class UniswapV2Provider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6",
    } as const

    const initCodeHash = {
      [ChainId.BASE]:
        "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f",
    } as const

    super(chainId, web3Client, factory, initCodeHash)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.UniswapV2
  }
  getPoolProviderName(): string {
    return "UniswapV2"
  }
}

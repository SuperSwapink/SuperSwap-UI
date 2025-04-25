import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class SushiSwapV2Provider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.ETHEREUM]: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
      [ChainId.BASE]: "0x71524B4f93c58fcbF659783284E38825f0622859",
      [ChainId.ARBITRUM]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    } as const;

    const initCodeHash = {
      [ChainId.ETHEREUM]:
        "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303",
      [ChainId.BASE]:
        "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303",
      [ChainId.ARBITRUM]:
        "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SushiSwapV2;
  }
  getPoolProviderName(): string {
    return "SushiSwapV2";
  }
}

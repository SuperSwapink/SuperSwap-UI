import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { PancakeSwapV3BaseProvider } from "./PancakeSwapV3Base";

export class ZKSwapV3Provider extends PancakeSwapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      // [ChainId.ZKSYNC]: "0x88ADD6a7e3C221e02f978B388a092c9FD8cd7850",
    } as const;

    const initCodeHash = {
      // [ChainId.ZKSYNC]:
      //   "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
    } as const;

    const tickLens = {
      // [ChainId.ZKSYNC]: "0xAaB6e2b06961927Eb1665F0b2566170c71be50d3",
    } as const;

    const deployer = {
      // [ChainId.ZKSYNC]: "0x57d28Af38D126beFEbfDe996B7cDc34d58Ad4CFB",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens, deployer);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.ZKSwapV3;
  }
  getPoolProviderName(): string {
    return "ZKSwapV3";
  }
}

import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class SushiSwapV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
      [ChainId.OP]: "0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0",
    } as const;

    const initCodeHash = {
      [ChainId.BASE]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.OP]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.BASE]: "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3",
      [ChainId.OP]: "0x0367a647A68f304f2A6e453c25033a4249d7F2C6",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SushiSwapV3;
  }
  getPoolProviderName(): string {
    return "SushiSwapV3";
  }
}

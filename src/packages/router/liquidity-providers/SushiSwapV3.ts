import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class SushiSwapV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.OP]: "0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0",
      [ChainId.BASE]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
      [ChainId.ARBITRUM]: "0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e",
    } as const;

    const initCodeHash = {
      [ChainId.OP]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.BASE]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.ARBITRUM]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.OP]: "0x0367a647A68f304f2A6e453c25033a4249d7F2C6",
      [ChainId.BASE]: "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3",
      [ChainId.ARBITRUM]: "0x8516944E89f296eb6473d79aED1Ba12088016c9e",
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

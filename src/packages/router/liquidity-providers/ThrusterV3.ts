import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class ThrusterV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BLAST]: "0x71b08f13B3c3aF35aAdEb3949AFEb1ded1016127",
    } as const;

    const deployer = {
      [ChainId.BLAST]: "0xa08ae3d3f4dA51C22d3c041E468bdF4C61405AaB",
    } as const;

    const initCodeHash = {
      [ChainId.BLAST]:
        "0xd0c3a51b16dbc778f000c620eaabeecd33b33a80bd145e1f7cbc0d4de335193d",
    } as const;

    const tickLens = {
      [ChainId.BLAST]: "0x796B39328b92472b2Bd950AEB20D950611e02EF6",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens, deployer);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.ThrusterV3;
  }
  getPoolProviderName(): string {
    return "ThrusterV3";
  }
}

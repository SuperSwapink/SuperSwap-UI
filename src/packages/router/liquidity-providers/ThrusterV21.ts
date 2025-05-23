import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class ThrusterV21Provider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BLAST]: "0xb4A7D971D0ADea1c73198C97d7ab3f9CE4aaFA13",
    } as const;

    const initCodeHash = {
      [ChainId.BLAST]:
        "0x6f0346418750a1a53597a51ceff4f294b5f0e87f09715525b519d38ad3fab2cb",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.ThrusterV21;
  }
  getPoolProviderName(): string {
    return "ThrusterV21";
  }
}

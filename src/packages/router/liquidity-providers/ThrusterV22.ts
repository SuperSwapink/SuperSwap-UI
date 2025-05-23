import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class ThrusterV22Provider extends UniswapV2BaseProvider {
  override fee = 0.01;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BLAST]: "0x37836821a2c03c171fB1a595767f4a16e2b93Fc4",
    } as const;

    const initCodeHash = {
      [ChainId.BLAST]:
        "0x32a9ff5a51b653cbafe88e38c4da86b859135750d3ca435f0ce732c8e3bb8335",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.ThrusterV22;
  }
  getPoolProviderName(): string {
    return "ThrusterV22";
  }
}

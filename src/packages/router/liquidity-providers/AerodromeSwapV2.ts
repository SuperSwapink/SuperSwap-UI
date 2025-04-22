import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { VelodrmoeV2BaseProvider } from "./VelodrmoeV2Base";

export class AerodromeSwapV2Provider extends VelodrmoeV2BaseProvider {
  override fee = 0.01;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0x420DD381b31aEf6683db6B902084cB0FFECe40Da",
    } as const;

    const implementation = {
      [ChainId.BASE]: "0xA4e46b4f701c62e14DF11B48dCe76A7d793CD6d7",
    } as const;

    const initCodeHash = {
      [ChainId.BASE]:
        "0x6f178972b07752b522a4da1c5b71af6524e8b0bd6027ccb29e5312b0e5bcdc3c",
    } as const;

    const fees = {
      [ChainId.BASE]: 0.003,
    } as const;

    super(
      chainId,
      web3Client,
      factory,
      implementation,
      initCodeHash,
      (fees as any)[chainId]
    );
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.AerodromeSwapV2;
  }
  getPoolProviderName(): string {
    return "AerodromeSwapV2";
  }
}

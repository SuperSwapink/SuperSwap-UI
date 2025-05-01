import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { PancakeSwapV3BaseProvider } from "./PancakeSwapV3Base";

export class SonusV3Provider extends PancakeSwapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.SONEIUM]: "0x253240C98b2eeEF1bD3D5939A882ED9BD75216d1",
    } as const;

    const initCodeHash = {
      [ChainId.SONEIUM]:
        "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
    } as const;

    const tickLens = {
      [ChainId.SONEIUM]: "0x29BD1b5AB223C14a7994f82dDc3fB7D5B28409Fe",
    } as const;

    const deployer = {
      [ChainId.SONEIUM]: "0x03C7D39209bFeAE7D7c95D0A0C1E5ad3e340342B",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens, deployer);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SonusV3;
  }
  getPoolProviderName(): string {
    return "SonusV3";
  }
}

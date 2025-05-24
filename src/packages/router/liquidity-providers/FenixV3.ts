import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { AlgebraBaseProvider } from "./AlgebraBase";
import { FeeAmount } from "../../v3-sdk";
import ABI from "../abis/KimV4Pair";
import { ChainId } from "@/packages/chain";

export class FenixV3Provider extends AlgebraBaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BLAST]: "0x7a44CD060afC1B6F4c80A2B9b37f4473E74E25Df",
    } as const;

    const deployer = {
      [ChainId.BLAST]: "0x5aCCAc55f692Ae2F065CEdDF5924C8f6B53cDaa8",
    } as const;

    const initCodeHash = {
      [ChainId.BLAST]:
        "0xf45e886a0794c1d80aeae5ab5befecd4f0f2b77c0cf627f7c46ec92dc1fa00e4",
    } as const;

    const tickLens = {
      [ChainId.BLAST]: "0x796B39328b92472b2Bd950AEB20D950611e02EF6",
    } as const;

    super(
      chainId,
      web3Client,
      factory,
      deployer,
      initCodeHash,
      tickLens,
      FeeAmount.LOW,
      ABI
    );
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.FenixV3;
  }
  getPoolProviderName(): string {
    return "FenixV3";
  }
}

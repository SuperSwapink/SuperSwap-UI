import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { AlgebraBaseProvider } from "./AlgebraBase";
import { FeeAmount } from "../../v3-sdk";
import ABI from "../abis/KimV4Pair";
import { ChainId } from "@/packages/chain";

export class KimV4Provider extends AlgebraBaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.MODE]: "0xB5F00c2C5f8821155D8ed27E31932CFD9DB3C5D5",
    } as const;

    const deployer = {
      [ChainId.MODE]: "0x6414A461B19726410E52488d9D5ff33682701635",
    } as const;

    const initCodeHash = {
      [ChainId.MODE]:
        "0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d",
    } as const;

    const tickLens = {
      [ChainId.MODE]: "0xaB19a265EDe95c66c9A1159176088f0c9E2B48F7",
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
    return LiquidityProviders.KimV4;
  }
  getPoolProviderName(): string {
    return "KimV4";
  }
}

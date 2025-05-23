import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { AlgebraBaseProvider } from "./AlgebraBase";
import { FeeAmount } from "../../v3-sdk";
import ABI from "../abis/CamelotV3Pair";
import { ChainId } from "@/packages/chain";

export class CamelotSwapV3Provider extends AlgebraBaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.ARBITRUM]: "0x1a3c9B1d2F0529D97f2afC5136Cc23e58f1FD35B",
    } as const;

    const deployer = {
      [ChainId.ARBITRUM]: "0x6Dd3FB9653B10e806650F107C3B5A0a6fF974F65",
    } as const;

    const initCodeHash = {
      [ChainId.ARBITRUM]:
        "0x6c1bebd370ba84753516bc1393c0d0a6c645856da55f5393ac8ab3d6dbc861d3",
    } as const;

    const tickLens = {
      [ChainId.ARBITRUM]: "0x3e8e3ec2a797d12b96da4ad0b86cc1e7b75a6bb1",
    } as const;

    super(
      chainId,
      web3Client,
      factory,
      deployer,
      initCodeHash,
      tickLens,
      FeeAmount.LOWEST,
      ABI
    );
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.CamelotSwapV3;
  }
  getPoolProviderName(): string {
    return "CamelotSwapV3";
  }
}

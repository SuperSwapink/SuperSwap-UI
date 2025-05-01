import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { AlgebraBaseProvider } from "./AlgebraBase";
import ABI from "../abis/QuickSwapV3Pair";
import { ChainId } from "@/packages/chain";
import { FeeAmount } from "@/packages/v3-sdk";

export class QuickSwapV3Provider extends AlgebraBaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.POLYGON]: "0x411b0fAcC3489691f28ad58c47006AF5E3Ab3A28",
    } as const;

    const deployer = {
      [ChainId.POLYGON]: "0x2D98E2FA9da15aa6dC9581AB097Ced7af697CB92",
    } as const;

    const initCodeHash = {
      [ChainId.POLYGON]:
        "0x6ec6c9c8091d160c0aa74b2b14ba9c1717e95093bd3ac085cee99a49aab294a4",
    } as const;

    const tickLens = {
      [ChainId.POLYGON]: "0x464f33efe5b8dc1834fc268d650075621fac164a",
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
    return LiquidityProviders.QuickSwapV3;
  }
  getPoolProviderName(): string {
    return "QuickSwapV3";
  }
}

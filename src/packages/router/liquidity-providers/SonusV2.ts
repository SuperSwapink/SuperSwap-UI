import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";
import { ChainId } from "@/packages/chain";

export class SonusV2Provider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.SONEIUM]: "0xdb5D9562C80AEab3aeaED35ecaAe40Fd8DC9a4c8",
    } as const;
    const initCodeHash = {
      [ChainId.SONEIUM]:
        "0xf4fe426305566a0a6b0ace5977cdc55cdff58b8e37f568dc31f3069618200038",
    } as const;
    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SonusV2;
  }
  getPoolProviderName(): string {
    return "SonusV2";
  }
}

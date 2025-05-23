import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class NuriV2Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.SCROLL]: "0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42",
    } as const;

    const implementation = {
      [ChainId.SCROLL]: "0xDBA1DDc96d2df6850808f0317CEeF773A74e565C",
    } as const;

    const initCodeHash = {
      [ChainId.SCROLL]:
        "0x1565b129f2d1790f12d45301b9b084335626f0c92410bc43130763b69971135d",
    } as const;

    const tickLens = {
      [ChainId.SCROLL]: "0xAAAD7F8b00B5ce6F8516AC595f0Bb175Ae755c63",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.NuriV2;
  }
  getPoolProviderName(): string {
    return "NuriV2";
  }
}

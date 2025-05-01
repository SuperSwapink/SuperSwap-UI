import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class SonexProvider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.SONEIUM]: "0x3E4ff8662820E3dec3DACDb66ef1FFad5Dc5Ab83",
    } as const;

    const initCodeHash = {
      [ChainId.SONEIUM]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.SONEIUM]: "0xf8369D9023657749521FB1Bef6F7A520ce898A13",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.Sonex;
  }
  getPoolProviderName(): string {
    return "Sonex";
  }
}

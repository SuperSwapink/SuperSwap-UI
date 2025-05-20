import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class SwapModeV2Provider extends UniswapV2BaseProvider {
  override fee: number = 0.0025;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.MODE]: "0xfb926356BAf861c93C3557D7327Dbe8734A71891",
    } as const;

    const initCodeHash = {
      [ChainId.MODE]:
        "0x337ec3ca78ed47c450332dd308033d9900832b31b7539f3befcbc556bff3a4a8",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SwapModeV2;
  }
  getPoolProviderName(): string {
    return "SwapModeV2";
  }
}

import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";
import { ChainId } from "@/packages/chain";

export class SyncSwapV2Provider extends UniswapV2BaseProvider {
  override fee = 1000;

  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.LINEA]: "0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d",
      [ChainId.SCROLL]: "0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d",
    } as const;
    const initCodeHash = {
      [ChainId.LINEA]:
        "0x4f735b697ebe21f2cde0de70538125c07a001ddb644057e31d233b4e8dce5b14",
      [ChainId.SCROLL]:
        "0x4f735b697ebe21f2cde0de70538125c07a001ddb644057e31d233b4e8dce5b14",
    } as const;
    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SyncSwapV2;
  }
  getPoolProviderName(): string {
    return "SyncSwapV2";
  }
}

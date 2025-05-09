import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class ZKSwapV2Provider extends UniswapV2BaseProvider {
  override fee = 0.001;
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      // [ChainId.ZKSYNC]: "0x3a76e377ED58c8731F9DF3A36155942438744Ce3",
    } as const;

    const initCodeHash = {
      // [ChainId.ZKSYNC]:
      //   "0x0100045707a42494392b3558029b9869f865ff9df8f375dc1bf20b0555093f43",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.ZKSwapV2;
  }
  getPoolProviderName(): string {
    return "ZKSwapV2";
  }
}

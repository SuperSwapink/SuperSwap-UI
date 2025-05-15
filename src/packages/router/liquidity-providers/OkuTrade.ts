import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class OkuTradeProvider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      // [ChainId.LENS]: "0xe0704DB90bcAA1eAFc00E958FF815Ab7aa11Ef47",
    } as const;

    const initCodeHash = {
      // [ChainId.LENS]:
      //   "0x010013f177ea1fcbc4520f9a3ca7cd2d1d77959e05aa66484027cb38e712aeed",
    } as const;

    const tickLens = {
      // [ChainId.LENS]: "0x5499510c2e95F59b1Df0eC7C1bd2Fa76347df5Be",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.OkuTrade;
  }
  getPoolProviderName(): string {
    return "OkuTrade";
  }
}

import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class ReservoirSwapProvider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x640887A9ba3A9C53Ed27D0F7e8246A4F933f3424",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.INK]: "0x3e6Dba802d62aba2361Dd632fbC9f547AA6789aE",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.ReservoirSwap;
  }
  getPoolProviderName(): string {
    return "ReservoirSwap";
  }
}

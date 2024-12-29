import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class SquidSwapProvider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x63b54dBBD2DAbf89D5c536746e534711f6094199",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0x558913bee1a685b14c89e30e193ab7b56f1bb3fe719050cfe501b98572b88fb0",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.SquidSwap;
  }
  getPoolProviderName(): string {
    return "SquidSwap";
  }
}

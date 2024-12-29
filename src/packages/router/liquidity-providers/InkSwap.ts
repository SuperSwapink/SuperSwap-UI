import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class InkSwapProvider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0xBD5B41358A6601924F1Fd708aF1535a671f530A9",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.InkSwap;
  }
  getPoolProviderName(): string {
    return "InkSwap";
  }
}

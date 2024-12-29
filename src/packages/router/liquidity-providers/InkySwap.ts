import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class InkySwapProvider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x458C5d5B75ccBA22651D2C5b61cB1EA1e0b0f95D",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0xdb6150d8b7486220fb4136e079799d4c56bc5faffe4f942831eba66486f3262b",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.InkySwap;
  }
  getPoolProviderName(): string {
    return "InkySwap";
  }
}

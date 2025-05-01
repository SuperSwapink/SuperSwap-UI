import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class KyoFinanceV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.SONEIUM]: "0x137841043180BBA8EF52828F9030D1b7fE065F95",
    } as const;

    const initCodeHash = {
      [ChainId.SONEIUM]:
        "0xf54c8516b0255aaf493382e8534bab492d4325d4c84374ac39f7fa643a5cfbcd",
    } as const;

    const tickLens = {
      [ChainId.SONEIUM]: "0x27a7F9FD22035e9a63468A187dbbF9E4dD97F79A",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.KyoFinanceV3;
  }
  getPoolProviderName(): string {
    return "KyoFinanceV3";
  }
}

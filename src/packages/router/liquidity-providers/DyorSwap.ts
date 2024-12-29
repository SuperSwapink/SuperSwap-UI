import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV2BaseProvider } from "./UniswapV2Base";

export class DyorSwapProvider extends UniswapV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x6c86ab200661512fDBd27Da4Bb87dF15609A2806",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0x9a3bc671dfd6b951bc65dcd3b8b075ca91b062e698d49353b81f50fa82700166",
    } as const;

    super(chainId, web3Client, factory, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.DyorSwap;
  }
  getPoolProviderName(): string {
    return "DyorSwap";
  }
}

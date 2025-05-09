import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class NileProvider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.LINEA]: "0xAAA32926fcE6bE95ea2c51cB4Fcb60836D320C42",
    } as const;

    const initCodeHash = {
      [ChainId.LINEA]:
        "0x1565b129f2d1790f12d45301b9b084335626f0c92410bc43130763b69971135d",
    } as const;

    const tickLens = {
      [ChainId.LINEA]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.Nile;
  }
  getPoolProviderName(): string {
    return "Nile";
  }
}

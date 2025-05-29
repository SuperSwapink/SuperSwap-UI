import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { PancakeSwapV3BaseProvider } from "./PancakeSwapV3Base";

export class PancakeSwapV3Provider extends PancakeSwapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BSC]: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      [ChainId.BASE]: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      // [ChainId.ZKSYNC]: "0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB",
      [ChainId.ARBITRUM]: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      [ChainId.LINEA]: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
    } as const;

    const initCodeHash = {
      [ChainId.BSC]:
        "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
      [ChainId.BASE]:
        "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
      // [ChainId.ZKSYNC]:
      //   "0x01001487a7c45b21c52a0bc0558bf48d897d14792f1d0cc82733c8271d069178",
      [ChainId.ARBITRUM]:
        "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
      [ChainId.LINEA]:
        "0x6ce8eb472fa82df5469c6ab6d485f17c3ad13c8cd7af59b3d4a8026c5ce0f7e2",
    } as const;

    const tickLens = {
      [ChainId.BSC]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
      [ChainId.BASE]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
      // [ChainId.ZKSYNC]: "0x7b08978FA77910f77d273c353C62b5BFB9E6D17B",
      [ChainId.ARBITRUM]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
      [ChainId.LINEA]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
    } as const;

    const deployer = {
      [ChainId.BSC]: "0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9",
      [ChainId.BASE]: "0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9",
      // [ChainId.ZKSYNC]: "0x7f71382044A6a62595D5D357fE75CA8199123aD6",
      [ChainId.ARBITRUM]: "0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9",
      [ChainId.LINEA]: "0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens, deployer);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.PancakeSwapV3;
  }
  getPoolProviderName(): string {
    return "PancakeSwapV3";
  }
}

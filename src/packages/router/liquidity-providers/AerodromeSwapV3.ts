import { ChainId } from "../../chain"
import { PublicClient } from "viem"

import { LiquidityProviders } from "./LiquidityProvider"
import { VelodrmoeV3BaseProvider } from "./VelodrmoeV3Base"

export class AerodromeSwapV3Provider extends VelodrmoeV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.BASE]: "0x5e7BB104d84c7CB9B682AaC2F3d509f5F406809A",
    } as const

    const implementation = {
      [ChainId.BASE]: "0xeC8E5342B19977B4eF8892e02D8DAEcfa1315831",
    } as const

    const initCodeHash = {
      [ChainId.BASE]:
        "0xffb9af9ea6d9e39da47392ecc7055277b9915b8bfc9f83f105821b7791a6ae30",
    } as const

    const tickLens = {
      [ChainId.BASE]: "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3",
    } as const

    super(chainId, web3Client, factory, initCodeHash, tickLens, implementation)
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.AerodromeSwapV3
  }
  getPoolProviderName(): string {
    return "AerodromeSwapV3"
  }
}

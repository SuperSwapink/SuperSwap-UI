import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { VelodrmoeV3BaseProvider } from "./VelodrmoeV3Base";

export class VelodromeSwapV3Provider extends VelodrmoeV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x04625B046C69577EfC40e6c0Bb83CDBAfab5a55F",
    } as const;

    const implementation = {
      [ChainId.INK]: "0x321f7Dfb9B2eA9131B8C17691CF6e01E5c149cA8",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.INK]: "0x3e6Dba802d62aba2361Dd632fbC9f547AA6789aE",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens, implementation);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.VelodromeSwapV3;
  }
  getPoolProviderName(): string {
    return "VelodromeSwapV3";
  }
}

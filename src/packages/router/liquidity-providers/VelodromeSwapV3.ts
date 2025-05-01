import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { VelodrmoeV3BaseProvider } from "./VelodrmoeV3Base";

export class VelodromeSwapV3Provider extends VelodrmoeV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.OP]: "0xCc0bDDB707055e04e497aB22a59c2aF4391cd12F",
      [ChainId.SONEIUM]: "0x04625B046C69577EfC40e6c0Bb83CDBAfab5a55F",
      [ChainId.INK]: "0x04625B046C69577EfC40e6c0Bb83CDBAfab5a55F",
    } as const;

    const implementation = {
      [ChainId.OP]: "0xc28aD28853A547556780BEBF7847628501A3bCbb",
      [ChainId.SONEIUM]: "0x321f7Dfb9B2eA9131B8C17691CF6e01E5c149cA8",
      [ChainId.INK]: "0x321f7Dfb9B2eA9131B8C17691CF6e01E5c149cA8",
    } as const;

    const initCodeHash = {
      [ChainId.OP]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.SONEIUM]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.INK]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.OP]: "0xbfd8137f7d1516D3ea5cA83523914859ec47F573",
      [ChainId.SONEIUM]: "0x29BD1b5AB223C14a7994f82dDc3fB7D5B28409Fe",
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

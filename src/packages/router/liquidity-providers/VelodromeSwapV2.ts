import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { VelodrmoeV2BaseProvider } from "./VelodrmoeV2Base";

export class VelodromeSwapV2Provider extends VelodrmoeV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x31832f2a97Fd20664D76Cc421207669b55CE4BC0",
    } as const;

    const implementation = {
      [ChainId.INK]: "0x10499d88Bd32AF443Fc936F67DE32bE1c8Bb374C",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
    } as const;

    super(chainId, web3Client, factory, implementation, initCodeHash);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.VelodromeSwapV2;
  }
  getPoolProviderName(): string {
    return "VelodromeSwapV2";
  }
}

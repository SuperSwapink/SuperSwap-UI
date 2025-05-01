import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { VelodrmoeV2BaseProvider } from "./VelodrmoeV2Base";

export class VelodromeSwapV2Provider extends VelodrmoeV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.OP]: "0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a",
      [ChainId.SONEIUM]: "0x31832f2a97Fd20664D76Cc421207669b55CE4BC0",
      [ChainId.INK]: "0x31832f2a97Fd20664D76Cc421207669b55CE4BC0",
    } as const;

    const implementation = {
      [ChainId.OP]: "0x95885Af5492195F0754bE71AD1545Fe81364E531",
      [ChainId.SONEIUM]: "0x10499d88Bd32AF443Fc936F67DE32bE1c8Bb374C",
      [ChainId.INK]: "0x10499d88Bd32AF443Fc936F67DE32bE1c8Bb374C",
    } as const;

    const initCodeHash = {
      [ChainId.OP]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
      [ChainId.SONEIUM]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
      [ChainId.INK]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
    } as const;

    const fees = {
      [ChainId.OP]: 0.01,
      [ChainId.SONEIUM]: 0.003,
      [ChainId.INK]: 0.003,
    } as const;

    super(
      chainId,
      web3Client,
      factory,
      implementation,
      initCodeHash,
      (fees as any)[chainId]
    );
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.VelodromeSwapV2;
  }
  getPoolProviderName(): string {
    return "VelodromeSwapV2";
  }
}

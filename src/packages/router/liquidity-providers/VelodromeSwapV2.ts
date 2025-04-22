import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { VelodrmoeV2BaseProvider } from "./VelodrmoeV2Base";

export class VelodromeSwapV2Provider extends VelodrmoeV2BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.INK]: "0x31832f2a97Fd20664D76Cc421207669b55CE4BC0",
      [ChainId.OP]: "0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a",
    } as const;

    const implementation = {
      [ChainId.INK]: "0x10499d88Bd32AF443Fc936F67DE32bE1c8Bb374C",
      [ChainId.OP]: "0x95885Af5492195F0754bE71AD1545Fe81364E531",
    } as const;

    const initCodeHash = {
      [ChainId.INK]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
      [ChainId.OP]:
        "0xf134c874b39e61378a3f19b6f15a0e83c6916c54524901806f3e1ca3da7b2243",
    } as const;

    const fees = {
      [ChainId.INK]: 0.003,
      [ChainId.OP]: 0.01,
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

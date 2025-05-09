import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { AlgebraBaseProvider } from "./AlgebraBase";
import { FeeAmount } from "../../v3-sdk";
import ABI from "../abis/LynexV3Pair";
import { ChainId } from "@/packages/chain";

export class LynexV3Provider extends AlgebraBaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.LINEA]: "0x622b2c98123D303ae067DB4925CD6282B3A08D0F",
    } as const;

    const deployer = {
      [ChainId.LINEA]: "0x9A89490F1056A7BC607EC53F93b921fE666A2C48",
    } as const;

    const initCodeHash = {
      [ChainId.LINEA]:
        "0xc65e01e65f37c1ec2735556a24a9c10e4c33b2613ad486dd8209d465524bc3f4",
    } as const;

    const tickLens = {
      [ChainId.LINEA]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
    } as const;

    super(
      chainId,
      web3Client,
      factory,
      deployer,
      initCodeHash,
      tickLens,
      FeeAmount.LOWEST,
      ABI
    );
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.LynexV3;
  }
  getPoolProviderName(): string {
    return "LynexV3";
  }
}

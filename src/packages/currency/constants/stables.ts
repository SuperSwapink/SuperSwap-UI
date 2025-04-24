import { ChainId } from "../../chain";
import { USDC, USDT } from "./tokens";

export const STABLES = {
  [ChainId.ETHEREUM]: [USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM]],
  [ChainId.OP]: [USDC[ChainId.OP], USDT[ChainId.OP]],
  [ChainId.BASE]: [USDC[ChainId.BASE], USDT[ChainId.BASE]],
  [ChainId.ARBITRUM]: [USDC[ChainId.ARBITRUM], USDT[ChainId.ARBITRUM]],
  [ChainId.INK]: [USDC[ChainId.INK]],
} as const;

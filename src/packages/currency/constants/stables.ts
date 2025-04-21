import { ChainId } from "../../chain";
import { USDC, USDT } from "./tokens";

export const STABLES = {
  [ChainId.INK]: [USDC[ChainId.INK]],
  [ChainId.BASE]: [USDC[ChainId.BASE], USDT[ChainId.BASE]],
  [ChainId.OP]: [USDC[ChainId.OP], USDT[ChainId.OP]],
} as const;

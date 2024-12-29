import { ChainId } from "../../chain";
import { USDC } from "./tokens";

export const STABLES = {
  [ChainId.INK]: [USDC[ChainId.INK]],
} as const;

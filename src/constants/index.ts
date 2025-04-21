import { ChainId } from "@/packages/chain";
import Ink from "@/assets/network/ink.png";

export const DEFAULT_IMAGE_URL = "/media/unknown.svg";

export const NATIVE_GAS_FEE = 1000000000000000n;

export const SWAP_FEE = 0n;

export const ACROSS_ESTIMATED_TIME = {
  [ChainId.BASE]: {
    [ChainId.INK]: 5,
    [ChainId.OP]: 4,
  },
  [ChainId.INK]: {
    [ChainId.BASE]: 3,
    [ChainId.OP]: 3,
  },
  [ChainId.OP]: {
    [ChainId.INK]: 5,
    [ChainId.BASE]: 4,
  },
};

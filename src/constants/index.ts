import { ChainId } from "@/packages/chain";
import Ink from "@/assets/network/ink.png";

export const DEFAULT_IMAGE_URL = "/media/unknown.svg";

export const NATIVE_GAS_FEE = 1000000000000000n;

export const SWAP_FEE = 0n;

export const ACROSS_ESTIMATED_TIME = {
  [ChainId.ETHEREUM]: {
    [ChainId.OP]: 21,
    [ChainId.BASE]: 21,
    [ChainId.ARBITRUM]: 21,
    [ChainId.INK]: 31,
  },
  [ChainId.OP]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.BASE]: 4,
    [ChainId.ARBITRUM]: 4,
    [ChainId.INK]: 5,
  },
  [ChainId.BASE]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 4,
    [ChainId.ARBITRUM]: 4,
    [ChainId.INK]: 5,
  },
  [ChainId.ARBITRUM]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 4,
    [ChainId.BASE]: 4,
    [ChainId.INK]: 5,
  },
  [ChainId.INK]: {
    [ChainId.ETHEREUM]: 11,
    [ChainId.OP]: 3,
    [ChainId.BASE]: 3,
    [ChainId.ARBITRUM]: 4,
  },
};

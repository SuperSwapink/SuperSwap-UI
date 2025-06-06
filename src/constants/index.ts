import { ChainId } from "@/packages/chain";
import Ink from "@/assets/network/ink.png";

export const DEFAULT_IMAGE_URL = "/media/unknown.svg";

export const NATIVE_GAS_FEE = 1000000000000000n;

export const SWAP_FEE = 0n;

export const ACROSS_ESTIMATED_TIME = {
  [ChainId.ETHEREUM]: {
    [ChainId.OP]: 21,
    [ChainId.BSC]: 18,
    [ChainId.UNICHAIN]: 19,
    [ChainId.POLYGON]: 22,
    // [ChainId.LENS]: 31,
    // [ChainId.ZKSYNC]: 19,
    [ChainId.WORLDCHAIN]: 31,
    [ChainId.REDSTONE]: 19,
    [ChainId.LISK]: 31,
    [ChainId.SONEIUM]: 19,
    [ChainId.BASE]: 21,
    [ChainId.MODE]: 31,
    [ChainId.ARBITRUM]: 21,
    [ChainId.INK]: 31,
    [ChainId.LINEA]: 19,
    [ChainId.BLAST]: 17,
    [ChainId.SCROLL]: 36,
    [ChainId.ZORA]: 31,
  },
  [ChainId.OP]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 8,
    // [ChainId.LENS]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 4,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 4,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 4,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 2,
    [ChainId.ZORA]: 5,
  },
  [ChainId.BSC]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 3,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 5,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 5,
  },
  [ChainId.UNICHAIN]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.POLYGON]: 8,
    // [ChainId.LENS]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 4,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 3,
    [ChainId.ZORA]: 5,
  },
  [ChainId.POLYGON]: {
    [ChainId.ETHEREUM]: 41,
    [ChainId.OP]: 43,
    [ChainId.BSC]: 46,
    [ChainId.UNICHAIN]: 43,
    // [ChainId.LENS]: 46,
    // [ChainId.ZKSYNC]: 46,
    [ChainId.WORLDCHAIN]: 46,
    [ChainId.REDSTONE]: 46,
    [ChainId.LISK]: 46,
    [ChainId.SONEIUM]: 46,
    [ChainId.BASE]: 43,
    [ChainId.MODE]: 46,
    [ChainId.ARBITRUM]: 43,
    [ChainId.INK]: 46,
    [ChainId.LINEA]: 46,
    [ChainId.BLAST]: 38,
    [ChainId.SCROLL]: 41,
    [ChainId.ZORA]: 46,
  },
  // [ChainId.LENS]: {
  //   [ChainId.ETHEREUM]: 11,
  //   [ChainId.OP]: 3,
  //   [ChainId.UNICHAIN]: 3,
  //   [ChainId.POLYGON]: 9,
  //   // [ChainId.ZKSYNC]: 3,
  //   [ChainId.WORLDCHAIN]: 7,
  //   [ChainId.LISK]: 7,
  //   [ChainId.SONEIUM]: 7,
  //   [ChainId.BASE]: 3,
  //   [ChainId.MODE]: 7,
  //   [ChainId.ARBITRUM]: 3,
  //   [ChainId.INK]: 7,
  //   [ChainId.LINEA]: 3,
  //   [ChainId.ZORA]: 7,
  // },
  // [ChainId.ZKSYNC]: {
  //   [ChainId.ETHEREUM]: 9,
  //   [ChainId.OP]: 3,
  //   [ChainId.UNICHAIN]: 3,
  //   [ChainId.POLYGON]: 6,
  //   [ChainId.WORLDCHAIN]: 5,
  //   [ChainId.SONEIUM]: 5,
  //   [ChainId.BASE]: 3,
  //   [ChainId.ARBITRUM]: 3,
  //   [ChainId.INK]: 5,
  //   [ChainId.LINEA]: 3,
  //   [ChainId.ZORA]: 5,
  // },
  [ChainId.WORLDCHAIN]: {
    [ChainId.ETHEREUM]: 11,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 7,
    [ChainId.REDSTONE]: 19,
    [ChainId.LISK]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 7,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 5,
  },
  [ChainId.REDSTONE]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 7,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.LISK]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 5,
  },
  [ChainId.LISK]: {
    [ChainId.ETHEREUM]: 11,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 7,
    [ChainId.REDSTONE]: 5,
    [ChainId.SONEIUM]: 7,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 7,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 7,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 7,
  },
  [ChainId.SONEIUM]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 7,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 5,
    [ChainId.LISK]: 7,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 7,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 6,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 5,
  },
  [ChainId.BASE]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 4,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 8,
    // [ChainId.LENS]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 4,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 4,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 2,
    [ChainId.ZORA]: 5,
  },
  [ChainId.MODE]: {
    [ChainId.ETHEREUM]: 11,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 7,
    [ChainId.REDSTONE]: 5,
    [ChainId.LISK]: 7,
    [ChainId.SONEIUM]: 7,
    [ChainId.BASE]: 3,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 7,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 7,
  },
  [ChainId.ARBITRUM]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 4,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 8,
    // [ChainId.LENS]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 4,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 4,
    [ChainId.MODE]: 5,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 2,
    [ChainId.ZORA]: 5,
  },
  [ChainId.INK]: {
    [ChainId.ETHEREUM]: 11,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 5,
    [ChainId.LISK]: 7,
    [ChainId.SONEIUM]: 6,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 7,
    [ChainId.ARBITRUM]: 4,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
    [ChainId.ZORA]: 5,
  },
  [ChainId.LINEA]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 6,
    // [ChainId.LENS]: 5,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 4,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 2,
    [ChainId.ZORA]: 5,
  },
  [ChainId.BLAST]: {
    [ChainId.ETHEREUM]: 9,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 6,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 4,
    [ChainId.LISK]: 5,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 5,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.SCROLL]: 2,
    [ChainId.ZORA]: 5,
  },
  [ChainId.SCROLL]: {
    [ChainId.ETHEREUM]: 13,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 12,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 14,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 12,
    [ChainId.REDSTONE]: 12,
    [ChainId.LISK]: 12,
    [ChainId.SONEIUM]: 12,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 12,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 12,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.ZORA]: 12,
  },
  [ChainId.ZORA]: {
    [ChainId.ETHEREUM]: 11,
    [ChainId.OP]: 3,
    [ChainId.BSC]: 5,
    [ChainId.UNICHAIN]: 3,
    [ChainId.POLYGON]: 9,
    // [ChainId.LENS]: 7,
    // [ChainId.ZKSYNC]: 3,
    [ChainId.WORLDCHAIN]: 5,
    [ChainId.REDSTONE]: 5,
    [ChainId.LISK]: 7,
    [ChainId.SONEIUM]: 5,
    [ChainId.BASE]: 3,
    [ChainId.MODE]: 7,
    [ChainId.ARBITRUM]: 3,
    [ChainId.INK]: 5,
    [ChainId.LINEA]: 3,
    [ChainId.BLAST]: 3,
    [ChainId.SCROLL]: 4,
  },
};

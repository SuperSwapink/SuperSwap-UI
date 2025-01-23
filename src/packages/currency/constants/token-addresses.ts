import { ChainId } from "../../chain";

export const WETH9_ADDRESS = {
  [ChainId.INK]: "0x4200000000000000000000000000000000000006",
} as const;

export const WNATIVE_ADDRESS = {
  [ChainId.INK]: WETH9_ADDRESS[ChainId.INK],
} as const;

export const USDC_ADDRESS = {
  [ChainId.INK]: "0xF1815bd50389c46847f0Bda824eC8da914045D14",
} as const;

export const USDT_ADDRESS = {
  [ChainId.INK]: "0x0200C29006150606B650577BBE7B6248F58470c1",
} as const;
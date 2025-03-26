import { ChainId } from "../../chain"

export const WETH9_ADDRESS = {
  [ChainId.INK]: "0x4200000000000000000000000000000000000006",
  [ChainId.BASE]: "0x4200000000000000000000000000000000000006",
} as const

export const WNATIVE_ADDRESS = {
  [ChainId.INK]: WETH9_ADDRESS[ChainId.INK],
  [ChainId.BASE]: WETH9_ADDRESS[ChainId.BASE],
} as const

export const USDC_ADDRESS = {
  [ChainId.INK]: "0xF1815bd50389c46847f0Bda824eC8da914045D14",
  [ChainId.BASE]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
} as const

export const USDT0_ADDRESS = {
  [ChainId.INK]: "0x0200C29006150606B650577BBE7B6248F58470c1",
} as const

export const USDT_ADDRESS = {
  [ChainId.BASE]: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
} as const

export const MYST_ADDRESS = {
  [ChainId.INK]: "0xEe73d2f34D66f0f07aF6ab37b42713520E33119C",
} as const

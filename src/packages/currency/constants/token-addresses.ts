import { Chain, ChainId } from "../../chain";

export const WETH9_ADDRESS = {
  [ChainId.INK]: "0x4200000000000000000000000000000000000006",
  [ChainId.BASE]: "0x4200000000000000000000000000000000000006",
  [ChainId.OP]: "0x4200000000000000000000000000000000000006",
} as const;

export const WNATIVE_ADDRESS = {
  [ChainId.INK]: WETH9_ADDRESS[ChainId.INK],
  [ChainId.BASE]: WETH9_ADDRESS[ChainId.BASE],
  [ChainId.OP]: WETH9_ADDRESS[ChainId.OP],
} as const;

export const USDC_ADDRESS = {
  [ChainId.INK]: "0xF1815bd50389c46847f0Bda824eC8da914045D14",
  [ChainId.BASE]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  [ChainId.OP]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
} as const;

export const USDT0_ADDRESS = {
  [ChainId.INK]: "0x0200C29006150606B650577BBE7B6248F58470c1",
} as const;

export const USDT_ADDRESS = {
  [ChainId.BASE]: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
  [ChainId.OP]: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
} as const;

export const KBTC_ADDRESS = {
  [ChainId.INK]: "0x73E0C0d45E048D25Fc26Fa3159b0aA04BfA4Db98",
} as const;

export const CBBTC_ADDRESS = {
  [ChainId.BASE]: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
} as const;

export const VIRTUAL_ADDRESS = {
  [ChainId.BASE]: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
} as const;

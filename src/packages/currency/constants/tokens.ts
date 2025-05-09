import { ChainId } from "../../chain";

import { Token } from "../Token";
import { addressMapToTokenMap } from "../functions/address-map-to-token-map";

import {
  CBBTC_ADDRESS,
  KBTC_ADDRESS,
  USDC_ADDRESS,
  USDCe_ADDRESS,
  USDT0_ADDRESS,
  USDT_ADDRESS,
  VIRTUAL_ADDRESS,
  WETH9_ADDRESS,
  WPOL_ADDRESS,
} from "./token-addresses";

export const WETH9 = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "/media/weth.png",
  },
  WETH9_ADDRESS
) as Record<keyof typeof WETH9_ADDRESS, Token>;

export const WPOL = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WPOL",
    name: "Wrapped POL",
    icon: "/media/wpol.png",
  },
  WPOL_ADDRESS
) as Record<keyof typeof WPOL_ADDRESS, Token>;

export const WNATIVE = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.OP]: WETH9[ChainId.OP],
  [ChainId.UNICHAIN]: WETH9[ChainId.UNICHAIN],
  [ChainId.POLYGON]: WPOL[ChainId.POLYGON],
  // [ChainId.ZKSYNC]: WETH9[ChainId.ZKSYNC],
  [ChainId.WORLDCHAIN]: WETH9[ChainId.WORLDCHAIN],
  [ChainId.SONEIUM]: WETH9[ChainId.SONEIUM],
  [ChainId.BASE]: WETH9[ChainId.BASE],
  [ChainId.ARBITRUM]: WETH9[ChainId.ARBITRUM],
  [ChainId.INK]: WETH9[ChainId.INK],
  [ChainId.LINEA]: WETH9[ChainId.LINEA],
  [ChainId.ZORA]: WETH9[ChainId.ZORA],
} as const;

export const USDC: Record<keyof typeof USDC_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDC",
      name: "USDC",
      icon: "/media/usdc.png",
    },
    USDC_ADDRESS
  ) as Record<keyof typeof USDC_ADDRESS, Token>),
} as const;

export const USDCe: Record<keyof typeof USDCe_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDC.e",
      name: "USDC.e",
      icon: "/media/usdc.png",
    },
    USDCe_ADDRESS
  ) as Record<keyof typeof USDCe_ADDRESS, Token>),
} as const;

export const USDT0: Record<keyof typeof USDT0_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDT0",
      name: "USDT0",
      icon: "/media/usdt0.svg",
    },
    USDT0_ADDRESS
  ) as Record<keyof typeof USDT0_ADDRESS, Token>),
} as const;

export const USDT: Record<keyof typeof USDT_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDT",
      name: "USDT",
      icon: "/media/usdt.png",
    },
    USDT_ADDRESS
  ) as Record<keyof typeof USDT_ADDRESS, Token>),
} as const;

export const KBTC: Record<keyof typeof KBTC_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 8,
      symbol: "kBTC",
      name: "Kraken Wrapped Bitcoin",
      icon: "/media/kbtc.webp",
    },
    KBTC_ADDRESS
  ) as Record<keyof typeof KBTC_ADDRESS, Token>),
} as const;

export const CBBTC: Record<keyof typeof CBBTC_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 8,
      symbol: "cbBTC",
      name: "Coinbase Wrapped BTC",
      icon: "/media/cbbtc.svg",
    },
    CBBTC_ADDRESS
  ) as Record<keyof typeof CBBTC_ADDRESS, Token>),
} as const;

export const VIRTUAL: Record<keyof typeof VIRTUAL_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 8,
      symbol: "VIRTUAL",
      name: "Virtual Protocol",
      icon: "/media/virtual.svg",
    },
    VIRTUAL_ADDRESS
  ) as Record<keyof typeof VIRTUAL_ADDRESS, Token>),
} as const;

import { ChainId } from "../../chain";

import { Token } from "../Token";
import { addressMapToTokenMap } from "../functions/address-map-to-token-map";

import {
  CBBTC_ADDRESS,
  KBTC_ADDRESS,
  USDC_ADDRESS,
  USDT0_ADDRESS,
  USDT_ADDRESS,
  VIRTUAL_ADDRESS,
  WETH9_ADDRESS,
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

export const WNATIVE = {
  [ChainId.INK]: WETH9[ChainId.INK],
  [ChainId.BASE]: WETH9[ChainId.BASE],
  [ChainId.OP]: WETH9[ChainId.OP],
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

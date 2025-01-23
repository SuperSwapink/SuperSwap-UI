import { ChainId } from "../../chain";

import { Token } from "../Token";
import { addressMapToTokenMap } from "../functions/address-map-to-token-map";

import {
  USDC_ADDRESS,
  USDT_ADDRESS,
  WETH9_ADDRESS,
  WNATIVE_ADDRESS,
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
} as const;

export const USDC: Record<keyof typeof USDC_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDC.e",
      name: "USDC (Stargate)",
      icon: "/media/usdc.png",
    },
    USDC_ADDRESS
  ) as Record<keyof typeof USDC_ADDRESS, Token>),
} as const;

export const USDT: Record<keyof typeof USDT_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 6,
      symbol: "USDT0",
      name: "USDT0",
      icon: "/media/usdt0.svg",
    },
    USDT_ADDRESS
  ) as Record<keyof typeof USDT_ADDRESS, Token>),
} as const;
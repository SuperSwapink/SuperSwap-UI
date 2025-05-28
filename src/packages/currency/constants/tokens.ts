import { ChainId } from "../../chain";

import { Token } from "../Token";
import { addressMapToTokenMap } from "../functions/address-map-to-token-map";

import {
  AERO_ADDRESS,
  BLAST_ADDRES,
  CBBTC_ADDRESS,
  KBTC_ADDRESS,
  MODE_ADDRESS,
  SCR_ADDRESS,
  USDB_ADDRESS,
  USDC_ADDRESS,
  USDCe_ADDRESS,
  USDT0_ADDRESS,
  USDT_ADDRESS,
  VIRTUAL_ADDRESS,
  WETH9_ADDRESS,
  WGHO_ADDRESS,
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

export const WGHO = addressMapToTokenMap(
  {
    decimals: 18,
    symbol: "WGHO",
    name: "Wrapped GHO",
    icon: "/media/wgho.png",
  },
  WGHO_ADDRESS
) as Record<keyof typeof WGHO_ADDRESS, Token>;

export const WNATIVE = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.OP]: WETH9[ChainId.OP],
  [ChainId.UNICHAIN]: WETH9[ChainId.UNICHAIN],
  [ChainId.POLYGON]: WPOL[ChainId.POLYGON],
  // [ChainId.LENS]: WGHO[ChainId.LENS],
  // [ChainId.ZKSYNC]: WETH9[ChainId.ZKSYNC],
  [ChainId.WORLDCHAIN]: WETH9[ChainId.WORLDCHAIN],
  [ChainId.REDSTONE]: WETH9[ChainId.REDSTONE],
  [ChainId.LISK]: WETH9[ChainId.LISK],
  [ChainId.SONEIUM]: WETH9[ChainId.SONEIUM],
  [ChainId.BASE]: WETH9[ChainId.BASE],
  [ChainId.MODE]: WETH9[ChainId.MODE],
  [ChainId.ARBITRUM]: WETH9[ChainId.ARBITRUM],
  [ChainId.INK]: WETH9[ChainId.INK],
  [ChainId.LINEA]: WETH9[ChainId.LINEA],
  [ChainId.BLAST]: WETH9[ChainId.BLAST],
  [ChainId.SCROLL]: WETH9[ChainId.SCROLL],
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

export const USDB: Record<keyof typeof USDB_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 18,
      symbol: "USDB",
      name: "USDB",
      icon: "/media/usdb.svg",
    },
    USDB_ADDRESS
  ) as Record<keyof typeof USDB_ADDRESS, Token>),
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

export const AERO: Record<keyof typeof AERO_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 18,
      symbol: "AERO",
      name: "Aerodrome",
      icon: "/media/aero.svg",
    },
    AERO_ADDRESS
  ) as Record<keyof typeof AERO_ADDRESS, Token>),
} as const;

export const MODE: Record<keyof typeof MODE_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 18,
      symbol: "MODE",
      name: "Mode",
      icon: "/media/mode.jpg",
    },
    MODE_ADDRESS
  ) as Record<keyof typeof MODE_ADDRESS, Token>),
} as const;

export const SCR: Record<keyof typeof SCR_ADDRESS, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 18,
      symbol: "SCR",
      name: "Scroll",
      icon: "/media/scr.png",
    },
    SCR_ADDRESS
  ) as Record<keyof typeof SCR_ADDRESS, Token>),
} as const;

export const BLAST: Record<keyof typeof BLAST_ADDRES, Token> = {
  ...(addressMapToTokenMap(
    {
      decimals: 18,
      symbol: "BLAST",
      name: "Blast",
      icon: "/media/blast.jpg",
    },
    BLAST_ADDRES
  ) as Record<keyof typeof BLAST_ADDRES, Token>),
} as const;

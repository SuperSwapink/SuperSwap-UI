import { ChainId } from "../../chain";

import { Native } from "../Native";
import { type Type } from "../Type";
import { USDC, WETH9, WNATIVE } from "./tokens";

const CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY = {
  [ChainId.INK]: {
    ETH: Native.onChain(ChainId.INK),
    WETH: WNATIVE[ChainId.INK],
    USDC: USDC[ChainId.INK],
  },
} as const;

export type ShortCurrencyNameChainId =
  keyof typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY;

export type ShortCurrencyName =
  keyof (typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY)[ShortCurrencyNameChainId];

export const isShortCurrencyNameSupported = (
  chainId: ChainId
): chainId is ShortCurrencyNameChainId =>
  chainId in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY;

export const isShortCurrencyName = (
  chainId: ChainId,
  shortCurrencyName: string
): shortCurrencyName is ShortCurrencyName => {
  return (
    isShortCurrencyNameSupported(chainId) &&
    shortCurrencyName in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId]
  );
};

export const currencyFromShortCurrencyName = (
  chainId: ChainId,
  shortCurrencyName: ShortCurrencyName
): Type => {
  if (!isShortCurrencyNameSupported(chainId))
    throw new Error(
      `Unsupported chain id ${chainId} for short currency name ${shortCurrencyName}`
    );
  if (!(shortCurrencyName in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId]))
    throw new Error(
      `Unsupported short currency name ${shortCurrencyName} on chain ${chainId}`
    );
  return CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId][shortCurrencyName];
};

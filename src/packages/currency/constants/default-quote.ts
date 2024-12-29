import { ChainId } from "../../chain/index";
import { Native } from "../Native";
import { USDC } from "./tokens";

export const defaultQuoteCurrency = {
  [ChainId.INK]: Native.onChain(ChainId.INK),
} as const;

export const defaultCurrencies = {
  [ChainId.INK]: [USDC[ChainId.INK]],
};

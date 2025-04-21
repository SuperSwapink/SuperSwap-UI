import { ChainId } from "../../chain/index";
import { Native } from "../Native";
import { USDC, USDT, USDT0, WETH9 } from "./tokens";

export const defaultQuoteCurrency = {
  [ChainId.INK]: WETH9[ChainId.INK],
  [ChainId.BASE]: USDC[ChainId.BASE],
  [ChainId.OP]: USDC[ChainId.OP],
} as const;

export const defaultCurrencies = {
  [ChainId.INK]: [WETH9[ChainId.INK], USDC[ChainId.INK], USDT0[ChainId.INK]],
  [ChainId.BASE]: [USDC[ChainId.BASE], USDT[ChainId.BASE], WETH9[ChainId.BASE]],
  [ChainId.OP]: [USDC[ChainId.OP], USDT[ChainId.OP], WETH9[ChainId.OP]],
};

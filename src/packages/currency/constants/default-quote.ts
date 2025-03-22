import { ChainId } from "../../chain/index"
import { Native } from "../Native"
import { USDC, USDT, USDT0, WETH9 } from "./tokens"

export const defaultQuoteCurrency = {
  [ChainId.INK]: Native.onChain(ChainId.INK),
  [ChainId.BASE]: Native.onChain(ChainId.BASE),
} as const

export const defaultCurrencies = {
  [ChainId.INK]: [USDC[ChainId.INK], USDT0[ChainId.INK], WETH9[ChainId.INK]],
  [ChainId.BASE]: [USDC[ChainId.BASE], USDT[ChainId.BASE], WETH9[ChainId.BASE]],
}

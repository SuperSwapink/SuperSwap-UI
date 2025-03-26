import { ChainId } from "../chain"
import { MYST, Token, USDC, USDT, USDT0, WNATIVE } from "../currency"

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[]
} = {
  [ChainId.INK]: [
    WNATIVE[ChainId.INK],
    USDC[ChainId.INK],
    MYST[ChainId.INK],
    USDT0[ChainId.INK],
  ],
  [ChainId.BASE]: [
    WNATIVE[ChainId.BASE],
    USDC[ChainId.BASE],
    USDT[ChainId.BASE],
  ],
}

import { ChainId } from "../chain"
import { Token, USDC, USDT, WNATIVE } from "../currency"

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[]
} = {
  [ChainId.INK]: [WNATIVE[ChainId.INK], USDC[ChainId.INK]],
  [ChainId.BASE]: [
    WNATIVE[ChainId.BASE],
    USDC[ChainId.BASE],
    USDT[ChainId.BASE],
  ],
}

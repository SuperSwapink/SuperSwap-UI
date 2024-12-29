import { ChainId } from "../chain";
import { Token, USDC, WETH9, WNATIVE } from "../currency";

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[];
} = {
  [ChainId.INK]: [WNATIVE[ChainId.INK], USDC[ChainId.INK]],
};

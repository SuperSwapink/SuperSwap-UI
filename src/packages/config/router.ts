import { ChainId } from "../chain";
import {
  CBBTC,
  KBTC,
  Token,
  USDC,
  USDT,
  USDT0,
  VIRTUAL,
  WNATIVE,
} from "../currency";

export const BASES_TO_CHECK_TRADES_AGAINST: {
  readonly [chainId: number]: Token[];
} = {
  [ChainId.ETHEREUM]: [
    WNATIVE[ChainId.ETHEREUM],
    USDC[ChainId.ETHEREUM],
    USDT[ChainId.ETHEREUM],
  ],
  [ChainId.OP]: [WNATIVE[ChainId.OP], USDC[ChainId.OP], USDT[ChainId.OP]],
  [ChainId.BASE]: [
    WNATIVE[ChainId.BASE],
    USDC[ChainId.BASE],
    USDT[ChainId.BASE],
    CBBTC[ChainId.BASE],
    VIRTUAL[ChainId.BASE],
  ],
  [ChainId.ARBITRUM]: [
    WNATIVE[ChainId.ARBITRUM],
    USDC[ChainId.ARBITRUM],
    USDT[ChainId.ARBITRUM],
  ],
  [ChainId.INK]: [
    WNATIVE[ChainId.INK],
    USDC[ChainId.INK],
    USDT0[ChainId.INK],
    KBTC[ChainId.INK],
  ],
};

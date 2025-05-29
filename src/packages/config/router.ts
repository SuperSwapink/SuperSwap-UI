import { ChainId } from "../chain";
import {
  AERO,
  BLAST,
  CBBTC,
  KBTC,
  MODE,
  SCR,
  Token,
  USDB,
  USDC,
  USDCe,
  USDT,
  USDT0,
  VIRTUAL,
  WETH9,
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
  [ChainId.UNICHAIN]: [
    WNATIVE[ChainId.UNICHAIN],
    USDC[ChainId.UNICHAIN],
    USDT0[ChainId.UNICHAIN],
  ],
  [ChainId.POLYGON]: [
    WNATIVE[ChainId.POLYGON],
    WETH9[ChainId.POLYGON],
    USDC[ChainId.POLYGON],
    USDT[ChainId.POLYGON],
  ],
  // [ChainId.LENS]: [
  //   WNATIVE[ChainId.LENS],
  //   WETH9[ChainId.LENS],
  //   USDC[ChainId.LENS],
  // ],
  // [ChainId.ZKSYNC]: [
  //   WNATIVE[ChainId.ZKSYNC],
  //   USDC[ChainId.ZKSYNC],
  //   USDT[ChainId.ZKSYNC],
  //   USDCe[ChainId.ZKSYNC],
  // ],
  [ChainId.WORLDCHAIN]: [
    WNATIVE[ChainId.WORLDCHAIN],
    USDCe[ChainId.WORLDCHAIN],
  ],
  [ChainId.LISK]: [WNATIVE[ChainId.LISK], USDT[ChainId.LISK]],
  [ChainId.SONEIUM]: [
    WNATIVE[ChainId.SONEIUM],
    USDCe[ChainId.SONEIUM],
    USDT[ChainId.SONEIUM],
  ],
  [ChainId.BASE]: [
    WNATIVE[ChainId.BASE],
    USDC[ChainId.BASE],
    USDT[ChainId.BASE],
    CBBTC[ChainId.BASE],
    VIRTUAL[ChainId.BASE],
    AERO[ChainId.BASE],
  ],
  [ChainId.MODE]: [
    WNATIVE[ChainId.MODE],
    USDC[ChainId.MODE],
    USDT[ChainId.MODE],
    MODE[ChainId.MODE],
  ],
  [ChainId.ARBITRUM]: [
    WNATIVE[ChainId.ARBITRUM],
    USDC[ChainId.ARBITRUM],
    USDT[ChainId.ARBITRUM],
    USDCe[ChainId.ARBITRUM],
  ],
  [ChainId.INK]: [
    WNATIVE[ChainId.INK],
    USDC[ChainId.INK],
    USDT0[ChainId.INK],
    KBTC[ChainId.INK],
  ],
  [ChainId.LINEA]: [
    WNATIVE[ChainId.LINEA],
    USDC[ChainId.LINEA],
    USDT[ChainId.LINEA],
  ],
  [ChainId.BLAST]: [
    WNATIVE[ChainId.BLAST],
    USDB[ChainId.BLAST],
    BLAST[ChainId.BLAST],
  ],
  [ChainId.SCROLL]: [
    WNATIVE[ChainId.SCROLL],
    USDC[ChainId.SCROLL],
    USDT[ChainId.SCROLL],
    SCR[ChainId.SCROLL],
  ],
  [ChainId.ZORA]: [WNATIVE[ChainId.ZORA], USDC[ChainId.ZORA]],
  [ChainId.REDSTONE]: [WNATIVE[ChainId.REDSTONE], USDCe[ChainId.REDSTONE]],
  [ChainId.BSC]: [
    WNATIVE[ChainId.BSC],
    WETH9[ChainId.BSC],
    USDC[ChainId.BSC],
    USDT[ChainId.BSC],
  ],
};

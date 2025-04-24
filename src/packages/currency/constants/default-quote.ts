import { ChainId } from "../../chain/index";
import { Native } from "../Native";
import { USDC, USDT, USDT0, WETH9 } from "./tokens";

export const defaultCurrencies = {
  [ChainId.ETHEREUM]: [
    WETH9[ChainId.ETHEREUM],
    USDC[ChainId.ETHEREUM],
    USDT[ChainId.ETHEREUM],
  ],
  [ChainId.INK]: [WETH9[ChainId.INK], USDC[ChainId.INK], USDT0[ChainId.INK]],
  [ChainId.BASE]: [USDC[ChainId.BASE], USDT[ChainId.BASE], WETH9[ChainId.BASE]],
  [ChainId.ARBITRUM]: [
    WETH9[ChainId.ARBITRUM],
    USDC[ChainId.ARBITRUM],
    USDT[ChainId.ARBITRUM],
  ],
  [ChainId.OP]: [USDC[ChainId.OP], USDT[ChainId.OP], WETH9[ChainId.OP]],
};

import { ChainId } from "../../chain";
import { USDC, USDCe, USDT, USDT0 } from "./tokens";

export const STABLES = {
  [ChainId.ETHEREUM]: [USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM]],
  [ChainId.OP]: [USDC[ChainId.OP], USDT[ChainId.OP]],
  [ChainId.UNICHAIN]: [USDC[ChainId.UNICHAIN], USDT0[ChainId.UNICHAIN]],
  [ChainId.POLYGON]: [USDC[ChainId.POLYGON], USDT[ChainId.POLYGON]],
  [ChainId.SONEIUM]: [USDCe[ChainId.SONEIUM], USDT[ChainId.SONEIUM]],
  [ChainId.BASE]: [USDC[ChainId.BASE], USDT[ChainId.BASE]],
  [ChainId.ARBITRUM]: [USDC[ChainId.ARBITRUM], USDT[ChainId.ARBITRUM]],
  [ChainId.INK]: [USDC[ChainId.INK]],
} as const;

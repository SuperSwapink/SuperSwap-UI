import { ChainId } from "../../chain";

export const nativeCurrencyIds = {
  [ChainId.ETHEREUM]: "ETH",
  [ChainId.OP]: "ETH",
  [ChainId.UNICHAIN]: "ETH",
  [ChainId.POLYGON]: "POL",
  [ChainId.SONEIUM]: "ETH",
  [ChainId.BASE]: "ETH",
  [ChainId.ARBITRUM]: "ETH",
  [ChainId.INK]: "ETH",
} as const;

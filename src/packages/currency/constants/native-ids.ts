import { ChainId } from "../../chain";

export const nativeCurrencyIds = {
  [ChainId.ETHEREUM]: "ETH",
  [ChainId.OP]: "ETH",
  [ChainId.BASE]: "ETH",
  [ChainId.ARBITRUM]: "ETH",
  [ChainId.INK]: "ETH",
} as const;

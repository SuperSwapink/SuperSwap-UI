import { ChainId } from "../chain";
import { Token, USDC, WETH9 } from "../currency";

export const SPOKE_POOL_ADDRESS: Record<ChainId, `0x${string}`> = {
  [ChainId.BASE]: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
  [ChainId.INK]: "0xeF684C38F94F48775959ECf2012D7E864ffb9dd4",
  [ChainId.OP]: "0x6f26Bf09B1C792e3228e5467807a900A503c0281",
};

export type SUPPORTED_ACROSS_ASSET_TYPE = "WETH" | "USDC";

export const SUPPORTED_ACROSS_ASSETS: Record<
  ChainId,
  Partial<Record<SUPPORTED_ACROSS_ASSET_TYPE, Token>>
> = {
  [ChainId.BASE]: {
    WETH: WETH9[ChainId.BASE],
    USDC: USDC[ChainId.BASE],
  },
  [ChainId.INK]: {
    WETH: WETH9[ChainId.INK],
  },
  [ChainId.OP]: {
    WETH: WETH9[ChainId.OP],
    USDC: USDC[ChainId.OP],
  },
};

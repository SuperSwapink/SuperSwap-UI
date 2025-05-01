import { ChainId } from "../chain";
import { Token, USDC, WETH9 } from "../currency";

export const SPOKE_POOL_ADDRESS: Record<ChainId, `0x${string}`> = {
  [ChainId.ETHEREUM]: "0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5",
  [ChainId.OP]: "0x6f26Bf09B1C792e3228e5467807a900A503c0281",
  [ChainId.UNICHAIN]: '0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64',
  [ChainId.POLYGON]: '0x9295ee1d8C5b022Be115A2AD3c30C72E34e7F096',
  [ChainId.SONEIUM]: '0x3baD7AD0728f9917d1Bf08af5782dCbD516cDd96',
  [ChainId.BASE]: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
  [ChainId.ARBITRUM]: "0xe35e9842fceaCA96570B734083f4a58e8F7C5f2A",
  [ChainId.INK]: "0xeF684C38F94F48775959ECf2012D7E864ffb9dd4",
};

export type SUPPORTED_ACROSS_ASSET_TYPE = "WETH" | "USDC";

export const SUPPORTED_ACROSS_ASSETS: Record<
  ChainId,
  Partial<Record<SUPPORTED_ACROSS_ASSET_TYPE, Token>>
> = {
  [ChainId.ETHEREUM]: {
    WETH: WETH9[ChainId.ETHEREUM],
    USDC: USDC[ChainId.ETHEREUM],
  },
  [ChainId.OP]: {
    WETH: WETH9[ChainId.OP],
    USDC: USDC[ChainId.OP],
  },
  [ChainId.UNICHAIN]: {
    WETH: WETH9[ChainId.UNICHAIN],
    USDC: USDC[ChainId.UNICHAIN],
  },
  [ChainId.POLYGON]: {
    WETH: WETH9[ChainId.POLYGON],
    USDC: USDC[ChainId.POLYGON],
  },
  [ChainId.SONEIUM]: {
    WETH: WETH9[ChainId.SONEIUM],
  },
  [ChainId.BASE]: {
    WETH: WETH9[ChainId.BASE],
    USDC: USDC[ChainId.BASE],
  },
  [ChainId.ARBITRUM]: {
    WETH: WETH9[ChainId.ARBITRUM],
    USDC: USDC[ChainId.ARBITRUM],
  },
  [ChainId.INK]: {
    WETH: WETH9[ChainId.INK],
  },
};

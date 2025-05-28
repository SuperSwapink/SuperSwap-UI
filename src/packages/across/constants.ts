import { ChainId } from "../chain";
import { Token, USDC, USDCe, USDT, WETH9 } from "../currency";

export const SPOKE_POOL_ADDRESS: Record<ChainId, `0x${string}`> = {
  [ChainId.ETHEREUM]: "0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5",
  [ChainId.OP]: "0x6f26Bf09B1C792e3228e5467807a900A503c0281",
  [ChainId.UNICHAIN]: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
  [ChainId.POLYGON]: "0x9295ee1d8C5b022Be115A2AD3c30C72E34e7F096",
  // [ChainId.LENS]: '0xe7cb3e167e7475dE1331Cf6E0CEb187654619E12',
  // [ChainId.ZKSYNC]: "0xE0B015E54d54fc84a6cB9B666099c46adE9335FF",
  [ChainId.WORLDCHAIN]: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
  [ChainId.REDSTONE]: "0x13fDac9F9b4777705db45291bbFF3c972c6d1d97",
  [ChainId.LISK]: "0x9552a0a6624A23B848060AE5901659CDDa1f83f8",
  [ChainId.SONEIUM]: "0x3baD7AD0728f9917d1Bf08af5782dCbD516cDd96",
  [ChainId.BASE]: "0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64",
  [ChainId.MODE]: "0x3baD7AD0728f9917d1Bf08af5782dCbD516cDd96",
  [ChainId.ARBITRUM]: "0xe35e9842fceaCA96570B734083f4a58e8F7C5f2A",
  [ChainId.INK]: "0xeF684C38F94F48775959ECf2012D7E864ffb9dd4",
  [ChainId.LINEA]: "0x7E63A5f1a8F0B4d0934B2f2327DAED3F6bb2ee75",
  [ChainId.BLAST]: "0x2D509190Ed0172ba588407D4c2df918F955Cc6E1",
  [ChainId.SCROLL]: "0x3baD7AD0728f9917d1Bf08af5782dCbD516cDd96",
  [ChainId.ZORA]: "0x13fDac9F9b4777705db45291bbFF3c972c6d1d97",
};

export type SUPPORTED_ACROSS_ASSET_TYPE = "WETH" | "USDC" | "USDT";

export const SUPPORTED_ACROSS_ASSETS: Record<
  ChainId,
  Partial<Record<SUPPORTED_ACROSS_ASSET_TYPE, Token>>
> = {
  [ChainId.ETHEREUM]: {
    WETH: WETH9[ChainId.ETHEREUM],
    USDC: USDC[ChainId.ETHEREUM],
    USDT: USDT[ChainId.ETHEREUM],
  },
  [ChainId.OP]: {
    WETH: WETH9[ChainId.OP],
    USDC: USDC[ChainId.OP],
    USDT: USDT[ChainId.OP],
  },
  [ChainId.UNICHAIN]: {
    WETH: WETH9[ChainId.UNICHAIN],
    USDC: USDC[ChainId.UNICHAIN],
  },
  [ChainId.POLYGON]: {
    WETH: WETH9[ChainId.POLYGON],
    USDC: USDC[ChainId.POLYGON],
    USDT: USDT[ChainId.POLYGON],
  },
  // [ChainId.LENS]: {
  //   WETH: WETH9[ChainId.LENS],
  //   USDC: USDC[ChainId.LENS],
  // },
  // [ChainId.ZKSYNC]: {
  //   WETH: WETH9[ChainId.ZKSYNC],
  //   USDC: USDCe[ChainId.ZKSYNC],
  // },
  [ChainId.WORLDCHAIN]: {
    WETH: WETH9[ChainId.WORLDCHAIN],
    USDC: USDCe[ChainId.WORLDCHAIN],
  },
  [ChainId.REDSTONE]: {
    WETH: WETH9[ChainId.REDSTONE],
    USDC: USDCe[ChainId.REDSTONE],
  },
  [ChainId.LISK]: {
    WETH: WETH9[ChainId.LISK],
    USDT: USDT[ChainId.LISK],
    USDC: USDCe[ChainId.LISK],
  },
  [ChainId.SONEIUM]: {
    WETH: WETH9[ChainId.SONEIUM],
    USDC: USDCe[ChainId.SONEIUM],
  },
  [ChainId.BASE]: {
    WETH: WETH9[ChainId.BASE],
    USDC: USDC[ChainId.BASE],
    USDT: USDT[ChainId.BASE],
  },
  [ChainId.MODE]: {
    WETH: WETH9[ChainId.MODE],
    USDT: USDT[ChainId.MODE],
    USDC: USDC[ChainId.MODE],
  },
  [ChainId.ARBITRUM]: {
    WETH: WETH9[ChainId.ARBITRUM],
    USDC: USDC[ChainId.ARBITRUM],
  },
  [ChainId.INK]: {
    WETH: WETH9[ChainId.INK],
  },
  [ChainId.LINEA]: {
    WETH: WETH9[ChainId.LINEA],
    USDT: USDT[ChainId.LINEA],
    USDC: USDC[ChainId.LINEA],
  },
  [ChainId.BLAST]: {
    WETH: WETH9[ChainId.BLAST],
  },
  [ChainId.SCROLL]: {
    WETH: WETH9[ChainId.SCROLL],
    USDC: USDC[ChainId.SCROLL],
    USDT: USDT[ChainId.SCROLL],
  },
  [ChainId.ZORA]: {
    WETH: WETH9[ChainId.ZORA],
    USDC: USDC[ChainId.ZORA],
  },
};

import InkLogo from "@/assets/network/ink.png";
import BaseLogo from "@/assets/network/base.svg";
import OpLogo from "@/assets/network/op.png";
import EthLogo from "@/assets/network/ethereum.png";
import ArbLogo from "@/assets/network/arbitrum.png";
import UniLogo from "@/assets/network/unichain.png";
import PolyLogo from "@/assets/network/polygon.png";
import SoneiumLogoDark from "@/assets/network/soneium-dark.webp";
import SoneiumLogoLight from "@/assets/network/soneium-light.webp";
import ZKLogo from "@/assets/network/zksync.png";
import WLCLogo from "@/assets/network/worldchain.png";
// import LensLogo from "@/assets/network/lens.png";
import LiskLogo from "@/assets/network/lisk.webp";
import ModeLogo from "@/assets/network/mode.jpg";
import ZoraLogo from "@/assets/network/zora.svg";
import LineaLogo from "@/assets/network/linea.svg";
import { StaticImageData } from "next/image";

export const ChainId = {
  ETHEREUM: 1,
  OP: 10,
  UNICHAIN: 130,
  POLYGON: 137,
  // LENS: 232,
  // ZKSYNC: 324,
  WORLDCHAIN: 480,
  LISK: 1135,
  SONEIUM: 1868,
  BASE: 8453,
  MODE: 34443,
  ARBITRUM: 42161,
  INK: 57073,
  LINEA: 59144,
  ZORA: 7777777,
} as const;
export type ChainId = (typeof ChainId)[keyof typeof ChainId];

export const isChainId = (chainId: number | undefined): chainId is ChainId =>
  chainId !== undefined && Object.values(ChainId).includes(chainId as ChainId);

export const ChainKey = {
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.OP]: "op",
  [ChainId.UNICHAIN]: "unichain",
  [ChainId.POLYGON]: "polygon",
  // [ChainId.LENS]: "lens",
  // [ChainId.ZKSYNC]: 'zksync',
  [ChainId.WORLDCHAIN]: "worldchain",
  [ChainId.LISK]: "lisk",
  [ChainId.SONEIUM]: "soneium",
  [ChainId.BASE]: "base",
  [ChainId.MODE]: "mode",
  [ChainId.ARBITRUM]: "arbitrum",
  [ChainId.INK]: "ink",
  [ChainId.LINEA]: "linea",
  [ChainId.ZORA]: "zora",
} as const;
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey];

export const SUPPORTED_CHAINS: Record<
  ChainId,
  {
    id: ChainId;
    name: string;
    icon: StaticImageData;
    iconLight?: StaticImageData;
  }
> = {
  [ChainId.ETHEREUM]: {
    id: ChainId.ETHEREUM,
    icon: EthLogo,
    name: "Ethereum",
  },
  [ChainId.OP]: {
    id: ChainId.OP,
    icon: OpLogo,
    name: "OP",
  },
  [ChainId.UNICHAIN]: {
    id: ChainId.UNICHAIN,
    icon: UniLogo,
    name: "Unichain",
  },
  [ChainId.POLYGON]: {
    id: ChainId.POLYGON,
    icon: PolyLogo,
    name: "Polygon",
  },
  // [ChainId.LENS]: {
  //   id: ChainId.LENS,
  //   icon: LensLogo,
  //   name: "Lens",
  // },
  // [ChainId.ZKSYNC]: {
  //   id: ChainId.ZKSYNC,
  //   icon: ZKLogo,
  //   name: 'zkSync'
  // },
  [ChainId.WORLDCHAIN]: {
    id: ChainId.WORLDCHAIN,
    icon: WLCLogo,
    name: "World",
  },
  [ChainId.LISK]: {
    id: ChainId.LISK,
    icon: LiskLogo,
    name: "Lisk",
  },
  [ChainId.SONEIUM]: {
    id: ChainId.SONEIUM,
    icon: SoneiumLogoDark,
    iconLight: SoneiumLogoLight,
    name: "Soneium",
  },
  [ChainId.BASE]: {
    id: ChainId.BASE,
    icon: BaseLogo,
    name: "Base",
  },
  [ChainId.MODE]: {
    id: ChainId.MODE,
    icon: ModeLogo,
    name: "Mode",
  },
  [ChainId.ARBITRUM]: {
    id: ChainId.ARBITRUM,
    icon: ArbLogo,
    name: "Arbitrum",
  },
  [ChainId.INK]: {
    id: ChainId.INK,
    icon: InkLogo,
    name: "Ink",
  },
  [ChainId.LINEA]: {
    id: ChainId.LINEA,
    icon: LineaLogo,
    name: "Linea",
  },
  [ChainId.ZORA]: {
    id: ChainId.ZORA,
    icon: ZoraLogo,
    name: "Zora",
  },
} as const;

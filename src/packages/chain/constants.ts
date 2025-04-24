import InkLogo from "@/assets/network/ink.png";
import BaseLogo from "@/assets/network/base.svg";
import OpLogo from "@/assets/network/op.png";
import EthLogo from "@/assets/network/ethereum.png";
import ArbLogo from "@/assets/network/arbitrum.png";
import { StaticImageData } from "next/image";

export const ChainId = {
  ETHEREUM: 1,
  OP: 10,
  BASE: 8453,
  ARBITRUM: 42161,
  INK: 57073,
} as const;
export type ChainId = (typeof ChainId)[keyof typeof ChainId];

export const isChainId = (chainId: number | undefined): chainId is ChainId =>
  chainId !== undefined && Object.values(ChainId).includes(chainId as ChainId);

export const ChainKey = {
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.OP]: "op",
  [ChainId.BASE]: "base",
  [ChainId.ARBITRUM]: "arbitrum",
  [ChainId.INK]: "ink",
} as const;
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey];

export const SUPPORTED_CHAINS: Record<
  ChainId,
  { id: ChainId; name: string; icon: StaticImageData }
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
  [ChainId.BASE]: {
    id: ChainId.BASE,
    icon: BaseLogo,
    name: "Base",
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
} as const;

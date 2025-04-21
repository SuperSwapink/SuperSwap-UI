import InkLogo from "@/assets/network/ink.png";
import BaseLogo from "@/assets/network/base.svg";
import OpLogo from "@/assets/network/op.png";
import { StaticImageData } from "next/image";

export const ChainId = {
  INK: 57073,
  BASE: 8453,
  OP: 10,
} as const;
export type ChainId = (typeof ChainId)[keyof typeof ChainId];

export const isChainId = (chainId: number | undefined): chainId is ChainId =>
  chainId !== undefined && Object.values(ChainId).includes(chainId as ChainId);

export const ChainKey = {
  [ChainId.INK]: "ink",
  [ChainId.BASE]: "base",
  [ChainId.OP]: "op",
} as const;
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey];

export const SUPPORTED_CHAINS: Record<
  ChainId,
  { id: ChainId; name: string; icon: StaticImageData }
> = {
  [ChainId.INK]: {
    id: ChainId.INK,
    icon: InkLogo,
    name: "Ink",
  },
  [ChainId.BASE]: {
    id: ChainId.BASE,
    icon: BaseLogo,
    name: "Base",
  },
  [ChainId.OP]: {
    id: ChainId.OP,
    icon: OpLogo,
    name: "OP",
  },
} as const;

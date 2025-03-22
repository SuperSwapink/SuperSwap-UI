import InkLogo from "@/assets/network/ink.png"
import BaseLogo from "@/assets/network/base.svg"
import { StaticImageData } from "next/image"

export const ChainId = {
  INK: 57073,
  BASE: 8453,
} as const
export type ChainId = (typeof ChainId)[keyof typeof ChainId]

export const isChainId = (chainId: number | undefined): chainId is ChainId =>
  chainId !== undefined && Object.values(ChainId).includes(chainId as ChainId)

export const ChainKey = {
  [ChainId.INK]: "ink",
  [ChainId.BASE]: "base",
} as const
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey]

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
} as const

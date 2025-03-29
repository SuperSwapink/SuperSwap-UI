import { ChainId } from "../chain"

// helper
export const HELPER_SUPPORTED_CHAIN_IDS = [ChainId.INK, ChainId.BASE] as const
export type helperChainId = (typeof HELPER_SUPPORTED_CHAIN_IDS)[number]
export const HELPER_ADDRESS: Record<helperChainId, `0x${string}`> = {
  [ChainId.INK]: "0xa35fD0cb40e47fcF2b6FB6c7aeB83A90A875E76F",
  [ChainId.BASE]: "0x13499F9139d2A7a4dBc0C5a90918Fe267B8d590f",
} as const
export const ishelperChainId = (chainId: ChainId): chainId is helperChainId =>
  HELPER_SUPPORTED_CHAIN_IDS.includes(chainId as helperChainId)

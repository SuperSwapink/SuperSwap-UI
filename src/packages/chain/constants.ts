export const ChainId = {
  INK: 57073
} as const
export type ChainId = (typeof ChainId)[keyof typeof ChainId]

export const isChainId = (chainId: number | undefined): chainId is ChainId =>
  chainId !== undefined && Object.values(ChainId).includes(chainId as ChainId)

export const ChainKey = {
  [ChainId.INK]: "ink"
} as const
export type ChainKey = (typeof ChainKey)[keyof typeof ChainKey]

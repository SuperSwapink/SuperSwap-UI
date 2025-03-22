import { ChainId } from "../chain"

// v3
export const ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS = [
  ChainId.INK,
  ChainId.BASE,
] as const
export type RouteProcessor3ChainId =
  (typeof ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS)[number]
export const ROUTE_PROCESSOR_3_ADDRESS: Record<
  RouteProcessor3ChainId,
  `0x${string}`
> = {
  [ChainId.INK]: "0x5839389261D1F38aac7c8E91DcDa85646bEcB414",
  [ChainId.BASE]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
} as const
export const isRouteProcessor3ChainId = (
  chainId: ChainId
): chainId is RouteProcessor3ChainId =>
  ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS.includes(
    chainId as RouteProcessor3ChainId
  )

// across
export const ACROSS_PORTAL_SUPPORTED_CHAIN_IDS = [
  ChainId.INK,
  ChainId.BASE,
] as const
export type AcrossPortalChainId =
  (typeof ACROSS_PORTAL_SUPPORTED_CHAIN_IDS)[number]
export const ACROSS_PORTAL_ADDRESS: Record<AcrossPortalChainId, `0x${string}`> =
  {
    [ChainId.INK]: "0xD4EED145b2a3aCFC657124406cD9b79a5a64fe44",
    [ChainId.BASE]: "0x54C8e426A5167cc34E7CCfb890FD7698733E2c60",
  } as const
export const isAcrossPortalChainId = (
  chainId: ChainId
): chainId is AcrossPortalChainId =>
  ACROSS_PORTAL_SUPPORTED_CHAIN_IDS.includes(chainId as AcrossPortalChainId)

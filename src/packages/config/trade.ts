import { ChainId } from "../chain";

// v3
export const ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS = [
  ChainId.INK,
  ChainId.BASE,
  ChainId.OP,
] as const;
export type RouteProcessor3ChainId =
  (typeof ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS)[number];
export const ROUTE_PROCESSOR_3_ADDRESS: Record<
  RouteProcessor3ChainId,
  `0x${string}`
> = {
  [ChainId.INK]: "0x5839389261D1F38aac7c8E91DcDa85646bEcB414",
  [ChainId.BASE]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
  [ChainId.OP]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
} as const;
export const isRouteProcessor3ChainId = (
  chainId: ChainId
): chainId is RouteProcessor3ChainId =>
  ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS.includes(
    chainId as RouteProcessor3ChainId
  );

// across
export const ACROSS_PORTAL_SUPPORTED_CHAIN_IDS = [
  ChainId.INK,
  ChainId.BASE,
  ChainId.OP,
] as const;
export type AcrossPortalChainId =
  (typeof ACROSS_PORTAL_SUPPORTED_CHAIN_IDS)[number];
export const ACROSS_PORTAL_ADDRESS: Record<AcrossPortalChainId, `0x${string}`> =
  {
    [ChainId.INK]: "0x839072f294FE180aa471e224C26F0172Ff5329E4",
    [ChainId.BASE]: "0x7274b2528D82E6a2b42FAA90dDBEc5489252d1a8",
    [ChainId.OP]: "0xbCA08Ef2F02376074f62af2Cc92EedE0ED38cdDd",
  } as const;
export const isAcrossPortalChainId = (
  chainId: ChainId
): chainId is AcrossPortalChainId =>
  ACROSS_PORTAL_SUPPORTED_CHAIN_IDS.includes(chainId as AcrossPortalChainId);

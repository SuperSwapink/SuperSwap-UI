import { ChainId } from "../chain";

// v3
export const ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS = [
  ChainId.ETHEREUM,
  ChainId.OP,
  ChainId.UNICHAIN,
  ChainId.POLYGON,
  ChainId.SONEIUM,
  ChainId.BASE,
  ChainId.ARBITRUM,
  ChainId.INK,
] as const;
export type RouteProcessor3ChainId =
  (typeof ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS)[number];
export const ROUTE_PROCESSOR_3_ADDRESS: Record<
  RouteProcessor3ChainId,
  `0x${string}`
> = {
  [ChainId.ETHEREUM]: "0x459197DAf6114D4A02425F66067d329F9DAc6961",
  [ChainId.OP]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
  [ChainId.UNICHAIN]: "0xA78d41AB470b34D20401C08A296FF5a7D8C6AC5B",
  [ChainId.POLYGON]: "0xb8eD8F9e2A04ecC70c801d4f05ab8F00599CEfC2",
  [ChainId.SONEIUM]: "0xb8eD8F9e2A04ecC70c801d4f05ab8F00599CEfC2",
  [ChainId.BASE]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
  [ChainId.ARBITRUM]: "0x459197DAf6114D4A02425F66067d329F9DAc6961",
  [ChainId.INK]: "0x5839389261D1F38aac7c8E91DcDa85646bEcB414",
} as const;
export const isRouteProcessor3ChainId = (
  chainId: ChainId
): chainId is RouteProcessor3ChainId =>
  ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS.includes(
    chainId as RouteProcessor3ChainId
  );

// across
export const ACROSS_PORTAL_SUPPORTED_CHAIN_IDS = [
  ChainId.ETHEREUM,
  ChainId.OP,
  ChainId.UNICHAIN,
  ChainId.POLYGON,
  ChainId.SONEIUM,
  ChainId.BASE,
  ChainId.ARBITRUM,
  ChainId.INK,
] as const;
export type AcrossPortalChainId =
  (typeof ACROSS_PORTAL_SUPPORTED_CHAIN_IDS)[number];
export const ACROSS_PORTAL_ADDRESS: Record<AcrossPortalChainId, `0x${string}`> =
  {
    [ChainId.ETHEREUM]: "0xb8eD8F9e2A04ecC70c801d4f05ab8F00599CEfC2",
    [ChainId.OP]: "0xbCA08Ef2F02376074f62af2Cc92EedE0ED38cdDd",
    [ChainId.UNICHAIN]: "0xbCA08Ef2F02376074f62af2Cc92EedE0ED38cdDd",
    [ChainId.POLYGON]: "0xaB19a265EDe95c66c9A1159176088f0c9E2B48F7",
    [ChainId.SONEIUM]: "0xA78d41AB470b34D20401C08A296FF5a7D8C6AC5B",
    [ChainId.BASE]: "0x7274b2528D82E6a2b42FAA90dDBEc5489252d1a8",
    [ChainId.ARBITRUM]: "0xbCA08Ef2F02376074f62af2Cc92EedE0ED38cdDd",
    [ChainId.INK]: "0x839072f294FE180aa471e224C26F0172Ff5329E4",
  } as const;
export const isAcrossPortalChainId = (
  chainId: ChainId
): chainId is AcrossPortalChainId =>
  ACROSS_PORTAL_SUPPORTED_CHAIN_IDS.includes(chainId as AcrossPortalChainId);

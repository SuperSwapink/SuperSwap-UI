import { ChainId } from "../chain";

// v3
export const ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS = [ChainId.INK] as const;
export type RouteProcessor3ChainId =
  (typeof ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS)[number];
export const ROUTE_PROCESSOR_3_ADDRESS: Record<
  RouteProcessor3ChainId,
  `0x${string}`
> = {
  [ChainId.INK]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
} as const;
export const isRouteProcessor3ChainId = (
  chainId: ChainId
): chainId is RouteProcessor3ChainId =>
  ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS.includes(
    chainId as RouteProcessor3ChainId
  );

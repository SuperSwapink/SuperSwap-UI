import { ChainId } from "../chain";

// v3
export const ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS = [ChainId.INK] as const;
export type RouteProcessor3ChainId =
  (typeof ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS)[number];
export const ROUTE_PROCESSOR_3_ADDRESS: Record<
  RouteProcessor3ChainId,
  `0x${string}`
> = {
  [ChainId.INK]: "0x5839389261D1F38aac7c8E91DcDa85646bEcB414",
} as const;
export const isRouteProcessor3ChainId = (
  chainId: ChainId
): chainId is RouteProcessor3ChainId =>
  ROUTE_PROCESSOR_3_SUPPORTED_CHAIN_IDS.includes(
    chainId as RouteProcessor3ChainId
  );

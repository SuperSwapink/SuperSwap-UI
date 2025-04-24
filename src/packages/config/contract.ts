import { ChainId } from "../chain";

// helper
export const HELPER_SUPPORTED_CHAIN_IDS = [
  ChainId.ETHEREUM,
  ChainId.OP,
  ChainId.BASE,
  ChainId.ARBITRUM,
  ChainId.INK,
] as const;
export type helperChainId = (typeof HELPER_SUPPORTED_CHAIN_IDS)[number];
export const HELPER_ADDRESS: Record<helperChainId, `0x${string}`> = {
  [ChainId.ETHEREUM]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
  [ChainId.OP]: "0xA78d41AB470b34D20401C08A296FF5a7D8C6AC5B",
  [ChainId.BASE]: "0x13499F9139d2A7a4dBc0C5a90918Fe267B8d590f",
  [ChainId.ARBITRUM]: "0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB",
  [ChainId.INK]: "0xa35fD0cb40e47fcF2b6FB6c7aeB83A90A875E76F",
} as const;
export const ishelperChainId = (chainId: ChainId): chainId is helperChainId =>
  HELPER_SUPPORTED_CHAIN_IDS.includes(chainId as helperChainId);

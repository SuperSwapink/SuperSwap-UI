import { ink } from "@/app/providers"
import { ChainId } from "../chain"
import { http, type PublicClientConfig } from "viem"
import { base } from "viem/chains"

export { ink }

export const config: Record<ChainId, PublicClientConfig[]> = {
  [ChainId.INK]: [
    {
      chain: ink,
      transport: http(`https://rpc-gel.inkonchain.com`),
    },
  ],
  [ChainId.BASE]: [
    {
      chain: base,
      transport: http(`https://base.llamarpc.com`),
    },
  ],
} as const

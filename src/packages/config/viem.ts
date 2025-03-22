import { ChainId } from "../chain"
import { defineChain, http, type PublicClientConfig } from "viem"
import { base } from "viem/chains"

export const ink = defineChain({
  id: 57073,
  name: "Ink",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-qnd.inkonchain.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Inkonchain Explorer",
      url: "https://explorer.inkonchain.com/",
      apiUrl: "https://explorer.inkonchain.com/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 956889,
    },
  },
})

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

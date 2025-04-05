import { ChainId } from "../chain"
import { defineChain, http, type PublicClientConfig } from "viem"

export const ink = defineChain({
  id: 57073,
  name: "Ink",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-gel.inkonchain.com/a64a10dae00f4ab3920b26c9c058b95e"],
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

export const base = /*#__PURE__*/ defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://lb.drpc.org/ogrpc?network=base&dkey=Ag7pbj02QkWPimVQN29ULVsYiB5VCJQR8I-DssvAG40d",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api",
    },
  },
  contracts: {
    l2OutputOracle: {
      [1]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0",
      },
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022,
    },
    portal: {
      [1]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143,
      },
    },
    l1StandardBridge: {
      [1]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143,
      },
    },
  },
  sourceId: 1,
})

export const config: Record<ChainId, PublicClientConfig[]> = {
  [ChainId.INK]: [
    {
      chain: ink,
      transport: http(`https://rpc-gel.inkonchain.com/a64a10dae00f4ab3920b26c9c058b95e`),
    },
  ],
  [ChainId.BASE]: [
    {
      chain: base,
      transport: http(
        `https://lb.drpc.org/ogrpc?network=base&dkey=Ag7pbj02QkWPimVQN29ULVsYiB5VCJQR8I-DssvAG40d`
      ),
    },
  ],
} as const

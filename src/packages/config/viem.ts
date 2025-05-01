import { ChainId } from "../chain";
import { defineChain, http, type PublicClientConfig } from "viem";
import { optimism, mainnet, arbitrum, polygon } from "viem/chains";

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
});

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
});

export const soneium = /*#__PURE__*/ defineChain({
  id: 1868,
  name: "Soneium Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.soneium.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://soneium.blockscout.com",
      apiUrl: "https://soneium.blockscout.com/api",
    },
  },
  contracts: {
    disputeGameFactory: {
      [1]: {
        address: "0x512a3d2c7a43bd9261d2b8e8c9c70d4bd4d503c0",
      },
    },
    l2OutputOracle: {
      [1]: {
        address: "0x0000000000000000000000000000000000000000",
      },
    },
    portal: {
      [1]: {
        address: "0x88e529a6ccd302c948689cd5156c83d4614fae92",
        blockCreated: 7061266,
      },
    },
    l1StandardBridge: {
      [1]: {
        address: "0xeb9bf100225c214efc3e7c651ebbadcf85177607",
        blockCreated: 7061266,
      },
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1,
    },
  },
});

export const unichain = /*#__PURE__*/ defineChain({
  id: 130,
  name: "Unichain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://unichain.drpc.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Uniscan",
      url: "https://uniscan.xyz",
      apiUrl: "https://api.uniscan.xyz/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0,
    },
    disputeGameFactory: {
      [1]: {
        address: "0x2F12d621a16e2d3285929C9996f478508951dFe4",
      },
    },
    portal: {
      [1]: {
        address: "0x0bd48f6B86a26D3a217d0Fa6FfE2B491B956A7a2",
      },
    },
    l1StandardBridge: {
      [1]: {
        address: "0x81014F44b0a345033bB2b3B21C7a1A308B35fEeA",
      },
    },
  },
});

export { optimism, mainnet, arbitrum, polygon };

export const config: Record<ChainId, PublicClientConfig[]> = {
  [ChainId.ETHEREUM]: [
    {
      chain: mainnet,
      transport: http(
        "https://mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"
      ),
    },
  ],
  [ChainId.OP]: [
    {
      chain: optimism,
      transport: http(`https://mainnet.optimism.io`),
    },
  ],
  [ChainId.UNICHAIN]: [
    {
      chain: unichain,
      transport: http("https://unichain.drpc.org"),
    },
  ],
  [ChainId.POLYGON]: [
    {
      chain: polygon,
      transport: http(
        "https://lb.drpc.org/ogrpc?network=polygon&dkey=AlvgkjhrKE6ynMGgm4YMvAxCBsIiIT0R8L-sEjfP07KJ"
      ),
    },
  ],
  [ChainId.SONEIUM]: [
    {
      chain: soneium,
      transport: http("https://rpc.soneium.org"),
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
  [ChainId.ARBITRUM]: [
    {
      chain: arbitrum,
      transport: http(
        "https://lb.drpc.org/ogrpc?network=arbitrum&dkey=AlvgkjhrKE6ynMGgm4YMvAxCBsIiIT0R8L-sEjfP07KJ"
      ),
    },
  ],
  [ChainId.INK]: [
    {
      chain: ink,
      transport: http(`https://ink.drpc.org`),
    },
  ],
} as const;

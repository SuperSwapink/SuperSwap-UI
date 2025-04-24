export default [
  {
    chainId: 1,
    explorers: [
      {
        name: "Etherscan",
        url: "https://etherscan.io/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Ethereum",
    shortName: "ether",
  },
  {
    chainId: 10,
    explorers: [
      {
        name: "Optimism Explorer",
        url: "https://optimistic.etherscan.io/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "OP Mainnet",
    shortName: "op",
  },
  {
    chainId: 8453,
    explorers: [
      {
        name: "Basescan",
        url: "https://basescan.org/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Base",
    shortName: "base",
  },
  {
    chainId: 42161,
    explorers: [
      {
        name: "Arbiscan",
        url: "https://arbiscan.io/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Arbitrum",
    shortName: "arb",
  },
  {
    chainId: 57073,
    explorers: [
      {
        name: "Inkonchain Explorer",
        url: "https://explorer.inkonchain.com/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Ink",
    shortName: "ink",
  },
] as const;

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
    chainId: 130,
    explorers: [
      {
        name: "Uniscan",
        url: "https://uniscan.xyz/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Unichain",
    shortName: "uni",
  },
  {
    chainId: 137,
    explorers: [
      {
        name: "PolygonScan",
        url: "https://polygonscan.com/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "POL",
      symbol: "POL",
      decimals: 18,
    },
    name: "Polygon",
    shortName: "pol",
  },
  // {
  //   chainId: 324,
  //   explorers: [
  //     {
  //       name: "Etherscan",
  //       url: "https://era.zksync.network/",
  //       standard: "EIP3091",
  //     },
  //   ],
  //   nativeCurrency: {
  //     name: "Ether",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   name: "ZKsync Era",
  //   shortName: "zksync",
  // },
  {
    chainId: 480,
    explorers: [
      {
        name: "Worldscan",
        url: "https://worldscan.org/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "World Chain",
    shortName: "worldchain",
  },
  {
    chainId: 1868,
    explorers: [
      {
        name: "Blockscout",
        url: "https://soneium.blockscout.com/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Soneium",
    shortName: "soneium",
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
  {
    chainId: 59144,
    explorers: [
      {
        name: "Etherscan",
        url: "https://lineascan.build/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Linea Mainnet",
    shortName: "linea",
  },
  {
    chainId: 7777777,
    explorers: [
      {
        name: "Explorer",
        url: "https://explorer.zora.energy/",
        standard: "EIP3091",
      },
    ],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    name: "Zora",
    shortName: "zora",
  },
] as const;

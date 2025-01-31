import { ChainId } from "../chain";

export const PRIMARY_TOKEN_LIST = [
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
    icon: "/media/weth.png",
    category: "Native",
    chainId: ChainId.INK,
  },
  {
    address: "0xF1815bd50389c46847f0Bda824eC8da914045D14",
    symbol: "USDC.e",
    name: "USDC (Stargate)",
    decimals: 6,
    icon: "/media/usdc.png",
    category: "Stablecoin",
    chainId: ChainId.INK,
  },
  {
    address: "0x0200C29006150606B650577BBE7B6248F58470c1",
    symbol: "USDT0",
    name: "USDT0",
    decimals: 6,
    icon: "/media/usdt0.svg",
    category: "Stablecoin",
    chainId: ChainId.INK,
  },
  {
    address: "0x7f9AdFbd38b669F03d1d11000Bc76b9AaEA28A81",
    symbol: "xVELO",
    name: "Velodrome",
    decimals: 18,
    icon: "/media/xvelo.svg",
    category: "DeFi",
    chainId: ChainId.INK,
  },
  {
    address: "0x11476323D8DFCBAFac942588E2f38823d2Dd308e",
    symbol: "iETH",
    name: "Ink Staked ETH",
    decimals: 18,
    icon: "/media/ieth.svg",
    category: "DeFi",
    chainId: ChainId.INK,
  },
  {
    address: "0xbf0cAfCbaaF0be8221Ae8d630500984eDC908861",
    symbol: "SQUIDS",
    name: "Squidswap",
    decimals: 18,
    icon: "/media/squids.png",
    category: "DeFi",
    chainId: ChainId.INK,
  },
  {
    address: "0x2a1bce657F919ac3f9aB50b2584CFC77563A02Ec",
    symbol: "AK47",
    name: "Andru Kollor",
    decimals: 18,
    icon: "/media/ak47.svg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0xD642B49d10cc6e1BC1c6945725667c35e0875f22",
    symbol: "PURPLE",
    name: "Purple",
    decimals: 18,
    icon: "/media/purple.svg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0x0c5E2D1C98cd265C751e02F8F3293bC5764F9111",
    symbol: "SHROOMY",
    name: "Shroomy",
    decimals: 18,
    icon: "/media/shroomy.jpg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0x75e7A5316e44755FF4ad724ee45337D1Eef6895e",
    symbol: "PRL",
    name: "Pearl",
    decimals: 18,
    icon: "/media/prl.svg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0xB54830013CB7A524C5e7161246266C656359ab6a",
    symbol: "nsfi",
    name: "notsofast_iota",
    decimals: 18,
    icon: "/media/nsfi.jpg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0xCb95A3840c8eA5F0D4E78B67eC897Df84d17c5e6",
    symbol: "KRILL",
    name: "KRILL",
    decimals: 18,
    icon: "/media/krill.png",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0xEe73d2f34D66f0f07aF6ab37b42713520E33119C",
    symbol: "MYST",
    name: "MystInk",
    decimals: 18,
    icon: "/media/myst.svg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0x21C97338b1EA81A0b49930483C70d5B79ABcf041",
    symbol: "DBI",
    name: "DickButt on INK",
    decimals: 18,
    icon: "/media/dbi.png",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0x20C69C12abf2B6F8D8ca33604DD25C700c7e70A5",
    symbol: "CAT",
    name: "Cat Call Agent",
    decimals: 18,
    icon: "/media/cat.png",
    category: "AI Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0xCeA0f8ed85E4EB981406E84DDCA7062946093089",
    symbol: "PSD",
    name: "Poseidon",
    decimals: 18,
    icon: "/media/poseidon.jpeg",
    category: "Meme",
    chainId: ChainId.INK,
  },
  {
    address: "0x67314f6a5732a308408969269618F38132777a45",
    symbol: "SQUI",
    name: "Squi",
    decimals: 18,
    icon: "/media/squi.webp",
    category: "Meme",
    chainId: ChainId.INK,
  },
];

export const DEFAULT_TOKEN_LIST = [...PRIMARY_TOKEN_LIST];

export const TOKEN_LIST = [
  {
    address: "0xca5f2ccbd9c40b32657df57c716de44237f80f05",
    symbol: "KRAKEN",
    name: "Kraken",
    decimals: 18,
    icon: "/media/kraken.jpg",
    category: "Top",
    chainId: ChainId.INK,
  },
];

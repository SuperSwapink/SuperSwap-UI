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
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    icon: "/media/usdc.png",
    category: "Stablecoin",
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

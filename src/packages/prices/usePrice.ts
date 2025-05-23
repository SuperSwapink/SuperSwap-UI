import { useQuery } from "@tanstack/react-query";
import { ChainId } from "../chain";
import axios from "axios";
import useTokenPrices from "@/hooks/useTokenPrices";
import { USDC } from "../currency";

interface UsePrice {
  chainId: ChainId | undefined;
  address: string | undefined;
  enabled?: boolean;
}

const dexChainId: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.OP]: "optimism",
  [ChainId.UNICHAIN]: "unichain",
  [ChainId.POLYGON]: "polygon",
  // [ChainId.LENS]: "",
  [ChainId.WORLDCHAIN]: "worldchain",
  [ChainId.LISK]: "",
  [ChainId.SONEIUM]: "soneium",
  [ChainId.BASE]: "base",
  [ChainId.MODE]: "mode",
  [ChainId.ARBITRUM]: "arbitrum",
  [ChainId.INK]: "ink",
  [ChainId.LINEA]: "linea",
  [ChainId.BLAST]: 'blast',
  [ChainId.SCROLL]: 'scroll',
  [ChainId.ZORA]: "zora",
};

export const usePrice = ({ chainId, address, enabled }: UsePrice) => {
  const { setPrices } = useTokenPrices();
  return useQuery({
    queryKey: [chainId, address],
    queryFn: async () => {
      if (!chainId) return 0;
      const { data } = await axios.get(
        `https://api.dexscreener.com/tokens/v1/${dexChainId[chainId]}/${address}`
      );
      let price = 0;
      if (data.length) {
        if (
          data[0].baseToken.address.toLowerCase() === address?.toLowerCase()
        ) {
          price = Number(data[0].priceUsd);
        } else {
          price = Number(data[0].priceUsd) / Number(data[0].priceNative);
        }
        setPrices((prices: any) => ({
          ...prices,
          [`${chainId}:${address?.toLowerCase()}`]: price,
        }));
      }
      return price;
    },
    enabled: Boolean(chainId && address) && Boolean(enabled),
    staleTime: 900000, // 15 mins
    refetchOnWindowFocus: false,
  });
};

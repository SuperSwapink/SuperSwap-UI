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

const dexChainId = {
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.OP]: "optimism",
  [ChainId.BASE]: "base",
  [ChainId.ARBITRUM]: "arbitrum",
  [ChainId.INK]: "ink",
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
      console.log(data);
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

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

export const usePrice = ({ chainId, address, enabled }: UsePrice) => {
  const { setPrices } = useTokenPrices();
  return useQuery({
    queryKey: [chainId, address],
    queryFn: async () => {
      if (!chainId) return 0;
      if (
        chainId === 1 &&
        address?.toLowerCase() === USDC[ChainId.ETHEREUM].address.toLowerCase()
      )
        return 1;
      const { data } = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${address}`
      );
      const price = Number(data?.pairs?.[0]?.priceUsd ?? "0");
      setPrices((prices: any) => ({
        ...prices,
        [`${chainId}:${address?.toLowerCase()}`]: price,
      }));
      return price;
    },
    enabled: Boolean(chainId && address) && Boolean(enabled),
    staleTime: 900000, // 15 mins
    refetchOnWindowFocus: false,
  });
};

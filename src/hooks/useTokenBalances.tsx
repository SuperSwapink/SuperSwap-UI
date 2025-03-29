import { helperAbi } from "@/packages/abi/helperAbi"
import { ChainId } from "@/packages/chain"
import { config } from "@/packages/config"
import { HELPER_ADDRESS } from "@/packages/config/contract"
import { Type } from "@/packages/currency"
import { useQuery } from "@tanstack/react-query"
import { Address, createPublicClient } from "viem"

const useTokenBalances = (
  chainId: ChainId,
  address: Address | undefined,
  tokenList: Type[],
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["token-balances", chainId, address, tokenList],
    queryFn: async () => {
      if (!address) {
        return { [chainId]: {} }
      }
      const publicClient = createPublicClient(config[chainId][0])
      const tokens = tokenList
        .filter((item) => item.chainId === chainId)
        .map((item) =>
          item.isNative
            ? "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
            : item.address
        )
      const balances = await publicClient
        .readContract({
          abi: helperAbi,
          address: HELPER_ADDRESS[chainId],
          functionName: "getBalances",
          args: [address, tokens],
        })
        .catch(console.log)

      return {
        [chainId]: Object.fromEntries(
          tokens.map((token, i) => [token.toLowerCase(), balances?.[i]])
        ),
      }
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    enabled,
  })
}

export default useTokenBalances

import { ChainId } from "@/packages/chain"
import { DEFAULT_TOKEN_LIST, PRIMARY_TOKEN_LIST } from "@/packages/config"
import { Native, Token } from "@/packages/currency"

const useTokenList = (chainId: ChainId, primaryTokens?: boolean) => {
  const defaultTokens = [
    Native.onChain(chainId),
    ...(primaryTokens ? PRIMARY_TOKEN_LIST : DEFAULT_TOKEN_LIST)
      .filter((item) => item.chainId === chainId)
      .map((item) =>
        "native" in item
          ? Native.onChain(chainId)
          : new Token({
              chainId: item.chainId,
              address: item.address,
              decimals: item.decimals,
              name: item.name,
              symbol: item.symbol,
              icon: item.icon,
              category: item.category,
            })
      ),
  ]

  return defaultTokens
}

export default useTokenList

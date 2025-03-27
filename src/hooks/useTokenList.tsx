import { aerodromeSugarAbi } from "@/packages/abi/aerodromeSugarAbi"
import { ChainId } from "@/packages/chain"
import { DEFAULT_TOKEN_LIST, PRIMARY_TOKEN_LIST } from "@/packages/config"
import { Native, Token } from "@/packages/currency"
import { useReadContract } from "wagmi"

const useTokenList = (chainId: ChainId, primaryTokens?: boolean) => {
  const { data: aerodromeData } = useReadContract({
    abi: aerodromeSugarAbi,
    functionName: "tokens",
    args: [5000n, 0n, "0x0000000000000000000000000000000000000000", []],
    address: "0x6f8ea68a1a66e49e16a470bcf6fe2a3a7b94cde9",
    chainId: ChainId.BASE,
  })

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

  const aerodromeTokens = aerodromeData
    ?.filter(
      (item) =>
        !defaultTokens.find(
          (k) =>
            k.chainId === ChainId.BASE &&
            !k.isNative &&
            k.address.toLowerCase() === item.token_address.toLowerCase()
        ) && item.listed
    )
    ?.map(
      (item) =>
        new Token({
          address: item.token_address,
          chainId: ChainId.BASE,
          decimals: item.decimals,
          name: item.symbol,
          symbol: item.symbol,
          icon: `https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/8453/${item.token_address.toLowerCase()}/logo.svg`,
        })
    )

  return [...defaultTokens, ...(aerodromeTokens ?? [])]
}

export default useTokenList

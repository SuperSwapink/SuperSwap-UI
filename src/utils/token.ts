import { ChainId } from "@/packages/chain"
import { DEFAULT_TOKEN_LIST, TOKEN_LIST } from "../packages/config/token"
import { Native, Token } from "@/packages/currency"
import { erc20Abi, getAddress, isAddress, PublicClient } from "viem"

export const getTokenInfo = async (
  address: string,
  publicClient: PublicClient
) => {
  if (address === "NATIVE") return Native.onChain(ChainId.INK)
  if (!isAddress(address)) return undefined
  const tokenInList = [...DEFAULT_TOKEN_LIST, ...TOKEN_LIST].find(
    (item) => item.address.toLowerCase() === address.toLowerCase()
  )
  if (tokenInList)
    return new Token({
      chainId: ChainId.INK,
      address: tokenInList.address,
      decimals: tokenInList.decimals,
      name: tokenInList.name,
      symbol: tokenInList.symbol,
      icon: tokenInList.icon,
      category: tokenInList.category,
    })

  try {
    const tokenInfo = await publicClient.multicall({
      contracts: [
        { address, abi: erc20Abi, functionName: "decimals" },
        { address, abi: erc20Abi, functionName: "name" },
        { address, abi: erc20Abi, functionName: "symbol" },
      ],
    })
    if (tokenInfo[0].result) {
      return new Token({
        chainId: ChainId.INK,
        address: getAddress(address),
        decimals: tokenInfo[0].result,
        name: tokenInfo[1].result,
        symbol: tokenInfo[2].result,
      })
    }
    return undefined
  } catch (err) {
    return undefined
  }
}

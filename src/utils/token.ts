import { ChainId } from "@/packages/chain"
import { DEFAULT_TOKEN_LIST } from "../packages/config/token"
import { Native, Token } from "@/packages/currency"
import { createPublicClient, erc20Abi, getAddress, isAddress } from "viem"
import { config } from "@/packages/config"

export const getTokenInfo = async (chainId: ChainId, address: string) => {
  if (address === "NATIVE") return Native.onChain(chainId)
  if (!isAddress(address)) return undefined
  const tokenInList = [...DEFAULT_TOKEN_LIST].find(
    (item) =>
      item.address.toLowerCase() === address.toLowerCase() &&
      item.chainId === chainId
  )

  if (tokenInList)
    return new Token({
      chainId,
      address: tokenInList.address,
      decimals: tokenInList.decimals,
      name: tokenInList.name,
      symbol: tokenInList.symbol,
      icon: tokenInList.icon,
      category: tokenInList.category,
    })

  try {
    const publicClient = createPublicClient({
      ...config[chainId][0],
    })
    const tokenInfo = await publicClient.multicall({
      contracts: [
        { address, abi: erc20Abi, functionName: "decimals" },
        { address, abi: erc20Abi, functionName: "name" },
        { address, abi: erc20Abi, functionName: "symbol" },
      ],
    })
    if (tokenInfo[0].result) {
      return new Token({
        chainId,
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

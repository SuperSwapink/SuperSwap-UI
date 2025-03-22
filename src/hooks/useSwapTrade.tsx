import { useAccount } from "wagmi"
import useSwapParams from "./useSwapParams"
import { useDebounce } from "./useDebounce"
import { Native, tryParseAmount } from "@/packages/currency"
import { ZERO } from "@/packages/math"
import useSettings from "./useSettings"
import { useQuery } from "@tanstack/react-query"
import { getXFusionTrade } from "@/utils/trade"
import { usePoolsCodeMap } from "@/packages/pools"
import { ChainId } from "@/packages/chain"
import { LiquidityProviders } from "@/packages/router"
import { fetchBestAcross } from "@/packages/across"

const useSwapTrade = () => {
  const { amountIn, tokenIn, tokenOut } = useSwapParams()
  const { address } = useAccount()
  const { slippage } = useSettings()

  const parsedAmount = useDebounce(tryParseAmount(amountIn, tokenIn), 200)

  const { data: poolsCodeMapIn } = usePoolsCodeMap({
    chainId: tokenIn?.chainId ?? ChainId.INK,
    currencyA: tokenIn,
    currencyB:
      tokenIn?.chainId === tokenOut?.chainId
        ? tokenOut
        : Native.onChain(tokenIn?.chainId ?? ChainId.INK),
    enabled: Boolean(parsedAmount?.greaterThan(0)),
  })

  const { data: poolsCodeMapOut } = usePoolsCodeMap({
    chainId: tokenOut?.chainId ?? ChainId.INK,
    currencyA: tokenOut,
    currencyB: Native.onChain(tokenOut?.chainId ?? ChainId.INK),
    enabled: Boolean(parsedAmount?.greaterThan(0)),
  })

  const trade = useQuery({
    queryKey: [
      "smart-router",
      tokenIn,
      tokenOut,
      parsedAmount,
      slippage,
      poolsCodeMapIn,
      poolsCodeMapOut,
      address,
    ],
    queryFn: async () => {
      try {
        if (
          !tokenIn ||
          !tokenOut ||
          !parsedAmount ||
          !parsedAmount.greaterThan(ZERO) ||
          !poolsCodeMapIn
        ) {
          return undefined
        }

        if (tokenIn.chainId === tokenOut.chainId) {
          const trades = await getXFusionTrade(
            tokenIn,
            tokenOut,
            address ?? "0xec288809063df839a62a3a61dd28f2142592b170",
            slippage,
            parsedAmount.quotient.toString(),
            poolsCodeMapIn
          )

          return { isBridge: false, ...trades }
        } else {
          const trades = await fetchBestAcross({
            tokenIn,
            tokenOut,
            amountIn: parsedAmount.quotient.toString(),
            recipient: address ?? "0xec288809063df839a62a3a61dd28f2142592b170",
            poolsCodeMapIn,
            poolsCodeMapOut,
            slippage,
          })

          return { isBridge: true, ...trades }
        }
      } catch (err) {
        console.log(err)
      }
    },
    refetchInterval: 15000,
    enabled:
      Boolean(tokenIn) &&
      Boolean(tokenOut) &&
      Boolean(parsedAmount?.greaterThan(ZERO)),
    refetchOnWindowFocus: false,
  })
  return trade
}

export default useSwapTrade

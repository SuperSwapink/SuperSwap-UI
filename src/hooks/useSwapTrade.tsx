import { useAccount } from "wagmi"
import useSwapParams from "./useSwapParams"
import { useDebounce } from "./useDebounce"
import { tryParseAmount } from "@/packages/currency"
import { ZERO } from "@/packages/math"
import useSettings from "./useSettings"
import { useQuery } from "@tanstack/react-query"
import { getXFusionTrade } from "@/utils/trade"
import { usePoolsCodeMap } from "@/packages/pools"
import { ChainId } from "@/packages/chain"
import { LiquidityProviders } from "@/packages/router"

const useSwapTrade = () => {
  const { amountIn, tokenIn, tokenOut } = useSwapParams()
  const { address } = useAccount()
  const { slippage } = useSettings()

  const parsedAmount = useDebounce(tryParseAmount(amountIn, tokenIn), 200)

  const { data: poolsCodeMap } = usePoolsCodeMap({
    chainId: ChainId.INK,
    currencyA: tokenIn,
    currencyB: tokenOut,
    enabled: Boolean(parsedAmount?.greaterThan(0)),
  })

  const trade = useQuery({
    queryKey: [
      "smart-router",
      tokenIn,
      tokenOut,
      parsedAmount,
      slippage,
      poolsCodeMap,
      address,
    ],
    queryFn: async () => {
      try {
        if (
          !tokenIn ||
          !tokenOut ||
          !parsedAmount ||
          !parsedAmount.greaterThan(ZERO)
        ) {
          return undefined
        }

        const trades = await getXFusionTrade(
          tokenIn,
          tokenOut,
          address ?? "0xec288809063df839a62a3a61dd28f2142592b170",
          slippage,
          parsedAmount.quotient.toString(),
          poolsCodeMap
        )

        return trades
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

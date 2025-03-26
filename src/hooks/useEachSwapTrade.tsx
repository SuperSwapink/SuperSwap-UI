import { useAccount } from "wagmi"
import useSwapParams from "./useSwapParams"
import { useDebounce } from "./useDebounce"
import { tryParseAmount } from "@/packages/currency"
import { ZERO } from "@/packages/math"
import useSettings from "./useSettings"
import { useQuery } from "@tanstack/react-query"
import { getBestSwap, getXFusionTrade } from "@/utils/trade"
import { usePoolsCodeMap } from "@/packages/pools"
import { ChainId } from "@/packages/chain"

export const SUPPORTED_SWAPCOMP_NETWORKS = [ChainId.INK]

const useEachSwapTrade = () => {
  const { amountIn, tokenIn, tokenOut } = useSwapParams()
  const { slippage } = useSettings()

  const parsedAmount = useDebounce(tryParseAmount(amountIn, tokenIn), 200)

  const { data: poolsCodeMap } = usePoolsCodeMap({
    chainId: ChainId.INK,
    currencyA: tokenIn,
    currencyB: tokenOut,
    enabled:
      Boolean(parsedAmount?.greaterThan(0)) &&
      tokenIn?.chainId === tokenOut?.chainId,
  })

  const trade = useQuery({
    queryKey: [
      "best-swap",
      tokenIn,
      tokenOut,
      parsedAmount,
      slippage,
      poolsCodeMap,
    ],
    queryFn: async () => {
      try {
        if (
          !tokenIn ||
          !tokenOut ||
          !parsedAmount ||
          !parsedAmount.greaterThan(ZERO) ||
          tokenIn.chainId !== tokenOut.chainId ||
          SUPPORTED_SWAPCOMP_NETWORKS.find(
            (network) => network === tokenIn.chainId
          ) === undefined
        ) {
          return undefined
        }

        const bestSwap = await getBestSwap(
          tokenIn,
          tokenOut,
          slippage,
          parsedAmount.quotient.toString(),
          poolsCodeMap
        )

        return bestSwap
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

export default useEachSwapTrade

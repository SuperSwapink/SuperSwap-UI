import { UseQueryResult } from "@tanstack/react-query"
import ChevronDown from "../svgs/ChevronDown"
import { useState } from "react"
import { Amount, Price } from "@/packages/currency"
import useSwapParams from "@/hooks/useSwapParams"
import useSettings from "@/hooks/useSettings"
import { ACROSS_STATUS } from "@/packages/across"
import { ACROSS_ESTIMATED_TIME } from "@/constants"

interface SwapDetailsProps {
  trade: UseQueryResult<any, Error>
}

const SwapDetails: React.FC<SwapDetailsProps> = ({ trade }) => {
  const [open, setOpen] = useState(false)
  const [reverted, setReverted] = useState(false)
  const { tokenIn, tokenOut } = useSwapParams()
  const { slippage } = useSettings()

  const swapPrice =
    trade.data && tokenIn && tokenOut
      ? new Price(
          tokenIn,
          tokenOut,
          trade.data?.amountIn ?? "0",
          trade.data?.amountOut ?? "0"
        )
      : undefined

  const isWrap = tokenIn?.wrapped.address === tokenOut?.wrapped.address

  return trade.data && tokenIn && tokenOut ? (
    <div className="mt-4 border rounded-2xl px-4 border-[#e3e7ee] dark:border-[#202835]">
      <div className="relative min-h-10 flex items-center justify-between cursor-pointer">
        <button
          className="text-[#6c86ad] text-sm font-semibold z-[1]"
          onClick={() => setReverted(!reverted)}
        >
          1 {!reverted ? tokenIn.symbol : tokenOut.symbol} ={" "}
          {!reverted
            ? swapPrice?.toSignificant(9)
            : swapPrice?.invert()?.toSignificant(9)}{" "}
          {!reverted ? tokenOut.symbol : tokenIn.symbol}
        </button>
        <button
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          onClick={() => setOpen(!open)}
        ></button>
        <ChevronDown className="w-3.5 h-3.5 text-[#6c86ad]" />
      </div>
      <div
        data-open={open}
        className="max-h-0 data-[open=true]:max-h-[300px] transition-all overflow-hidden"
      >
        <div className="gap-0.5 pt-4 pb-6">
          <div className="flex items-start justify-between">
            <span className="text-[#6c86ad] text-sm">Expected Output:</span>
            <span className="text-[#6c86ad] text-sm font-semibold">
              {Amount.fromRawAmount(
                tokenOut,
                trade.data?.amountOut ?? "0"
              ).toSignificant(6)}{" "}
              {tokenOut.symbol}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-[#6c86ad] text-sm">Minimum Received:</span>
            <span className="text-[#6c86ad] text-sm font-semibold">
              {isWrap
                ? Amount.fromRawAmount(
                    tokenOut,
                    BigInt(trade.data?.amountOut ?? "0")
                  ).toSignificant(6)
                : Amount.fromRawAmount(
                    tokenOut,
                    (BigInt(trade.data?.amountOut ?? "0") *
                      (1000000n - BigInt(slippage * 10000))) /
                      1000000n
                  ).toSignificant(6)}{" "}
              {tokenOut.symbol}
            </span>
          </div>
          {trade?.data?.priceImpact !== undefined && (
            <div className="flex items-start justify-between">
              <span className="text-[#6c86ad] text-sm">Price Impact:</span>
              <span className="text-[#6c86ad] text-sm font-semibold">
                {isWrap
                  ? "0%"
                  : (trade.data?.priceImpact ?? 0) < 0.01
                  ? "<0.01%"
                  : `${(trade.data?.priceImpact ?? 0).toFixed(2)}%`}
              </span>
            </div>
          )}
          {tokenIn.chainId !== tokenOut.chainId &&
          trade.data &&
          trade.data.status === ACROSS_STATUS.SUCCESS ? (
            <div className="flex items-start justify-between">
              <span className="text-[#6c86ad] text-sm">Estimated Time:</span>
              <span className="text-[#6c86ad] text-sm font-semibold">
                ~
                {
                  (ACROSS_ESTIMATED_TIME as any)[tokenIn.chainId][
                    tokenOut.chainId
                  ]
                }
                s
              </span>
            </div>
          ) : null}
          {/* <div className="flex items-start justify-between">
            <span className="text-[#6c86ad] text-sm">Fees:</span>
            <span className="text-[#6c86ad] text-sm font-semibold">0 ETH</span>
          </div> */}
        </div>
      </div>
    </div>
  ) : null
}

export default SwapDetails

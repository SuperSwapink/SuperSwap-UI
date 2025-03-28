"use client"

import React from "react"
import Exchange from "../svgs/Exchange"
import SwapSide from "./SwapSide"
import useSwapParams from "../../hooks/useSwapParams"
import SwapButton from "./SwapButton"
import useSwapTrade from "@/hooks/useSwapTrade"
import { Amount } from "@/packages/currency"
import SwapDetails from "./SwapDetails"

const SwapPanel = () => {
  const {
    amountIn,
    setAmountIn,
    tokenIn,
    tokenOut,
    setTokenIn,
    setTokenOut,
    switchToken,
  } = useSwapParams()

  const trade = useSwapTrade()

  return (
    <div className="bg-white dark:bg-[#131823] relative p-4 md:p-8 mt-4 rounded-lg md:rounded-[32px] shadow-[0_12px_24px_#e2e9f6] dark:shadow-none">
      <SwapSide
        side="From"
        token={tokenIn}
        setToken={setTokenIn}
        amount={amountIn}
        setAmount={setAmountIn}
      />

      <div className="flex items-center w-full justify-center">
        <div className="border border-[#e3e7ee] dark:border-[#202835] w-full"></div>
        <button
          className="flex items-center justify-center rounded-full h-10 min-w-10 w-10 border border-[#e3e7ee] dark:border-[#202835] hover:rotate-180 transition-all mx-1"
          onClick={switchToken}
        >
          <Exchange className="h-4 w-4 text-[#2f8af5]" />
        </button>
        <div className="border border-[#e3e7ee] dark:border-[#202835] w-full"></div>
      </div>

      <SwapSide
        side="To"
        token={tokenOut}
        setToken={setTokenOut}
        disabled
        amount={
          trade?.data?.amountOut && tokenOut && amountIn.length > 0
            ? Amount.fromRawAmount(tokenOut, trade.data?.amountOut).toExact()
            : undefined
        }
      />
      <SwapDetails trade={trade} />
      {/* <SwapTrades trades={trade.data} /> */}
      <SwapButton trade={trade} />
    </div>
  )
}

export default SwapPanel

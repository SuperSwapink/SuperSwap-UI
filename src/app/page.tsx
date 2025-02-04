"use client"

import SettingPopup from "@/components/SettingPopup"
import SwapComp from "@/components/Swap/SwapComp"
import SwapPanel from "@/components/Swap/SwapPanel"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[650px] lg:w-[50%] md:pt-20 pt-10 w-[90%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="bg-transparent rounded-full text-[#1f1d1a] dark:text-white py-3 px-4 bg-white dark:bg-[#131823] font-semibold">
              Swap
            </button>
            <button
              className="bg-transparent rounded-full text-[#1f1d1a] dark:text-white py-3 px-4 bg-white dark:bg-[#131823] font-semibold"
              onClick={() => {
                window.open(
                  "https://app.rhino.fi/bridge/?refId=DeFi_SuperSwap&token=ETH&chainOut=INK&chainIn=BASE",
                  "_blank"
                )
              }}
            >
              Bridge
            </button>
          </div>
          <SettingPopup />
        </div>
        <SwapPanel />
        <SwapComp />
      </div>
    </div>
  )
}

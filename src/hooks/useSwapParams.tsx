"use client"

import { ChainId, isChainId } from "@/packages/chain"
import { Native, Type } from "@/packages/currency"
import { getTokenInfo } from "@/utils/token"
import { useSearchParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useAccount, usePublicClient } from "wagmi"

interface SwapParamsType {
  amountIn: string
  amountOut: string
  tokenIn?: Type
  tokenOut?: Type
  setTokenIn: any
  setTokenOut: any
  setAmountIn: any
  setAmountOut: any
  switchToken: any
}

const defaultVal: SwapParamsType = {
  tokenIn: Native.onChain(ChainId.INK),
  tokenOut: undefined,
  amountIn: "",
  amountOut: "",
  setTokenIn: () => {},
  setTokenOut: () => {},
  setAmountIn: () => {},
  setAmountOut: () => {},
  switchToken: () => {},
}

export const SwapParamsContext = React.createContext<SwapParamsType>(defaultVal)

export default function useSwapParams() {
  return React.useContext(SwapParamsContext)
}

export const SwapParamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { chainId } = useAccount()
  const [amountIn, setAmountIn] = useState("")
  const [amountOut, setAmountOut] = useState("")
  const [tokenIn, setTokenIn] = useState<Type | undefined>(
    Native.onChain(ChainId.INK)
  )
  const [tokenOut, setTokenOut] = useState<Type | undefined>()
  const [searchParams, setSearchParams] = useState(new URLSearchParams())
  const params = useSearchParams()
  const publicClient = usePublicClient()
  const router = useRouter()

  useEffect(() => {
    setSearchParams(params)
  }, [params])

  useEffect(() => {
    if (publicClient) {
      const token0 = searchParams.get("token0")
      const token1 = searchParams.get("token1")
      const amount = searchParams.get("amount")

      getTokenInfo(token0 ?? "", publicClient).then((res) =>
        setTokenIn((token) => res ?? Native.onChain(ChainId.INK))
      )
      getTokenInfo(token1 ?? "", publicClient).then((res) =>
        setTokenOut((token) => res)
      )
      setAmountIn(amount ?? "")
    }
  }, [publicClient])

  const switchToken = () => {
    const newTokenIn = tokenOut
    const newTokenOut = tokenIn

    const current = new URLSearchParams(Array.from(params.entries()))
    if (newTokenIn) {
      current.set("token0", newTokenIn.isNative ? "NATIVE" : newTokenIn.address)
    } else {
      current.delete("token0")
    }
    if (newTokenOut)
      current.set(
        "token1",
        newTokenOut.isNative ? "NATIVE" : newTokenOut.address
      )
    else current.delete("token1")
    current.delete("amount")

    const newPathname = `${window.location.pathname}?${current.toString()}`
    router.replace(newPathname, undefined)

    setAmountIn("0")
    setTokenIn(newTokenIn)
    setTokenOut(newTokenOut)
  }

  const _setTokenIn = (token: Type) => {
    const current = new URLSearchParams(Array.from(params.entries()))
    current.set("token0", token.isNative ? "NATIVE" : token.address)

    const newPathname = `${window.location.pathname}?${current.toString()}`
    router.replace(newPathname, undefined)
    if (tokenOut?.equals(token)) {
      setTokenOut(tokenIn)
    }
    setTokenIn(token)
  }

  const _setTokenOut = (token: Type) => {
    const current = new URLSearchParams(Array.from(params.entries()))
    current.set("token1", token.isNative ? "NATIVE" : token.address)

    const newPathname = `${window.location.pathname}?${current.toString()}`
    router.replace(newPathname, undefined)
    if (tokenIn?.equals(token)) {
      setTokenIn(tokenOut)
    }
    setTokenOut(token)
  }

  const _setAmountIn = (amount: string) => {
    const current = new URLSearchParams(Array.from(params.entries()))
    current.set("amount", amount)

    const newPathname = `${window.location.pathname}?${current.toString()}`
    router.replace(newPathname, undefined)
    setAmountIn(amount)
  }

  return (
    <SwapParamsContext.Provider
      value={{
        amountIn,
        amountOut,
        tokenIn,
        tokenOut,
        setTokenIn: _setTokenIn,
        setTokenOut: _setTokenOut,
        setAmountIn: _setAmountIn,
        setAmountOut,
        switchToken,
      }}
    >
      {children}
    </SwapParamsContext.Provider>
  )
}

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
  const [amountIn, setAmountIn] = useState("")
  const [amountOut, setAmountOut] = useState("")
  const [tokenIn, setTokenIn] = useState<Type | undefined>(
    Native.onChain(ChainId.INK)
  )
  const [tokenOut, setTokenOut] = useState<Type | undefined>()
  const params = useSearchParams()
  const publicClient = usePublicClient()
  const router = useRouter()

  useEffect(() => {
    if (publicClient) {
      const token0 = params.get("token0")
      const token1 = params.get("token1")
      const chain0 = Number(params.get("chain0"))
      const chain1 = Number(params.get("chain1"))
      const amount = params.get("amount")

      getTokenInfo(isChainId(chain0) ? chain0 : ChainId.INK, token0 ?? "").then(
        (res) => {
          console.log(res)
          setTokenIn(() => res ?? Native.onChain(ChainId.INK))
        }
      )
      getTokenInfo(isChainId(chain1) ? chain1 : ChainId.INK, token1 ?? "").then(
        (res) => setTokenOut(() => res)
      )
      setAmountIn(amount ?? "")
    }
  }, [])

  const switchToken = () => {
    const newTokenIn = tokenOut
    const newTokenOut = tokenIn

    const current = new URLSearchParams(Array.from(params.entries()))
    if (newTokenIn) {
      current.set("token0", newTokenIn.isNative ? "NATIVE" : newTokenIn.address)
      current.set("chain0", newTokenIn.chainId.toString())
    } else {
      current.delete("token0")
      current.delete("chain0")
    }
    if (newTokenOut) {
      current.set(
        "token1",
        newTokenOut.isNative ? "NATIVE" : newTokenOut.address
      )
      current.set("chain1", newTokenOut.chainId.toString())
    } else {
      current.delete("token1")
      current.delete("chain1")
    }
    current.delete("amount")

    const newPathname = `${window.location.pathname}?${current.toString()}`
    router.replace(newPathname, undefined)

    setAmountIn("")
    setTokenIn(newTokenIn)
    setTokenOut(newTokenOut)
  }

  const _setTokenIn = (token: Type) => {
    const current = new URLSearchParams(Array.from(params.entries()))
    current.set("token0", token.isNative ? "NATIVE" : token.address)
    current.set("chain0", token.chainId.toString())

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
    current.set("chain1", token.chainId.toString())

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

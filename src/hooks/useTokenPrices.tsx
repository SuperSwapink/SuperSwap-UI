"use client"

import React, { useState } from "react"

interface TokenPricesType {
  prices: any
  setPrices: any
}

const defaultVal: TokenPricesType = {
  prices: {},
  setPrices: () => {},
}

export const TokenPricesContext =
  React.createContext<TokenPricesType>(defaultVal)

export default function useTokenPrices() {
  return React.useContext(TokenPricesContext)
}

export const TokenPricesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prices, setPrices] = useState({})

  return (
    <TokenPricesContext.Provider
      value={{
        prices,
        setPrices,
      }}
    >
      {children}
    </TokenPricesContext.Provider>
  )
}

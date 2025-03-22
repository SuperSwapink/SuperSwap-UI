import React, { useEffect, useState } from "react"

type ImportTokenType = {
  chainId: number
  icon?: string
  address: string
  name: string
  symbol: string
  decimals: number
  category?: string
}

interface LocalTokenStorageType {
  importToken: any
  localTokenList: ImportTokenType[]
}

export const LocalTokenStorageContext =
  React.createContext<LocalTokenStorageType>({
    importToken: () => {},
    localTokenList: [],
  })

export const LocalTokenStorageProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [localTokenList, setLocalTokenList] = useState<ImportTokenType[]>([])

  useEffect(() => {
    const data = localStorage.getItem("token-storage")

    try {
      const parsedData = JSON.parse(data ?? "")
      setLocalTokenList(parsedData)
    } catch (err) {}
  }, [])

  const importToken = (token: ImportTokenType) => {
    const newTokenList = [...localTokenList, token]
    setLocalTokenList(() => newTokenList)
    localStorage.setItem("token-storage", JSON.stringify(newTokenList))
  }

  return (
    <LocalTokenStorageContext.Provider value={{ importToken, localTokenList }}>
      {children}
    </LocalTokenStorageContext.Provider>
  )
}

const useLocalTokenStorage = () => {
  return React.useContext(LocalTokenStorageContext)
}

export default useLocalTokenStorage

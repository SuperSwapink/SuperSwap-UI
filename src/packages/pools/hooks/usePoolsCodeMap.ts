import { useQuery } from "@tanstack/react-query"
import { getAllPoolsCodeMap } from "../actions/getAllPoolsCodeMap"
import { UsePoolsParams } from "../types"
import { LiquidityProviders } from "../../router"

export const usePoolsCodeMap = ({
  enabled = true,
  ...variables
}: UsePoolsParams & { providers?: LiquidityProviders[] }) => {
  const { chainId, currencyA, currencyB, providers } = variables
  return useQuery({
    queryKey: ["usePoolsCodeMap", { chainId, currencyA, currencyB, providers }],
    queryFn: async () => {
      const data = await getAllPoolsCodeMap(variables)

      return data
    },
    refetchInterval: 5000,
    enabled,
  })
}

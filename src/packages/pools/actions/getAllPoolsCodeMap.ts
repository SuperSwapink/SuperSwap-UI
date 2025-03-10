import { DataFetcher, LiquidityProviders, PoolCode } from "../../router";

import { UsePoolsParams } from "../types";

export const getAllPoolsCodeMap = async ({
  currencyA,
  currencyB,
  chainId,
  providers,
}: Omit<UsePoolsParams, "enabled"> & { providers?: LiquidityProviders[] }) => {
  if (!currencyA || !currencyB || !chainId) {
    return new Map<string, PoolCode>();
  }

  const liquidityProviders = providers
    ? providers
    : [
        LiquidityProviders.DyorSwap,
        LiquidityProviders.InkSwap,
        LiquidityProviders.SquidSwap,
        LiquidityProviders.InkySwap,
        LiquidityProviders.ReservoirSwap,
        LiquidityProviders.VelodromeSwapV2,
        LiquidityProviders.VelodromeSwapV3
      ];

  const dataFetcher = DataFetcher.onChain(chainId);
  // console.log('dataFetcher startDataFetching')
  dataFetcher.startDataFetching(liquidityProviders);

  await dataFetcher.fetchPoolsForToken(currencyA, currencyB);
  // console.log('dataFetcher stopDataFetching')
  dataFetcher.stopDataFetching();

  return dataFetcher.getCurrentPoolCodeMap(currencyA, currencyB);
};

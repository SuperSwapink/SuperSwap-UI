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
        LiquidityProviders.VelodromeSwapV3,
        LiquidityProviders.UniswapV2,
        LiquidityProviders.UniswapV3,
        LiquidityProviders.PancakeSwapV2,
        LiquidityProviders.PancakeSwapV3,
        LiquidityProviders.SushiSwapV2,
        LiquidityProviders.SushiSwapV3,
        LiquidityProviders.AerodromeSwapV2,
        LiquidityProviders.AerodromeSwapV3,
        LiquidityProviders.CamelotSwapV3,
        LiquidityProviders.QuickSwapV2,
        LiquidityProviders.QuickSwapV3,
        LiquidityProviders.KyoFinanceV3,
        LiquidityProviders.Sonex,
        LiquidityProviders.SonusV2,
      ];

  const dataFetcher = DataFetcher.onChain(chainId);
  // console.log('dataFetcher startDataFetching')
  dataFetcher.startDataFetching(liquidityProviders);

  await dataFetcher.fetchPoolsForToken(currencyA, currencyB);
  // console.log('dataFetcher stopDataFetching')
  dataFetcher.stopDataFetching();

  return dataFetcher.getCurrentPoolCodeMap(currencyA, currencyB);
};

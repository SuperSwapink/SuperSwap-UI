import { useAccount } from "wagmi";
import useSwapParams from "./useSwapParams";
import { useDebounce } from "./useDebounce";
import {
  defaultQuoteCurrency,
  Native,
  tryParseAmount,
} from "@/packages/currency";
import { ZERO } from "@/packages/math";
import useSettings from "./useSettings";
import { useQuery } from "@tanstack/react-query";
import { getXFusionTrade } from "@/utils/trade";
import { usePoolsCodeMap } from "@/packages/pools";
import { ChainId } from "@/packages/chain";
import { LiquidityProviders } from "@/packages/router";
import { fetchBestAcross } from "@/packages/across";
import { SUPPORTED_ACROSS_ASSETS } from "@/packages/across/constants";

const useSwapTrade = () => {
  const { amountIn, tokenIn, tokenOut } = useSwapParams();
  const { address } = useAccount();
  const { slippage } = useSettings();

  const parsedAmount = useDebounce(tryParseAmount(amountIn, tokenIn), 200);

  const { data: poolsCodeMapIn } = usePoolsCodeMap({
    chainId: tokenIn?.chainId ?? ChainId.INK,
    currencyA: tokenIn,
    currencyB:
      tokenIn?.chainId === tokenOut?.chainId
        ? tokenOut
        : Object.values(
            SUPPORTED_ACROSS_ASSETS[tokenIn?.chainId ?? ChainId.INK]
          ).find(
            (item) =>
              item.address.toLowerCase() !==
              tokenIn?.wrapped.address.toLowerCase()
          ) ??
          Object.values(
            SUPPORTED_ACROSS_ASSETS[tokenIn?.chainId ?? ChainId.INK]
          )[0],
    enabled: Boolean(tokenIn) && Boolean(tokenOut),
  });

  const { data: poolsCodeMapOut } = usePoolsCodeMap({
    chainId: tokenOut?.chainId ?? ChainId.INK,
    currencyA: tokenOut,
    currencyB:
      Object.values(
        SUPPORTED_ACROSS_ASSETS[tokenOut?.chainId ?? ChainId.INK]
      ).find(
        (item) =>
          item.address.toLowerCase() !== tokenOut?.wrapped.address.toLowerCase()
      ) ??
      Object.values(
        SUPPORTED_ACROSS_ASSETS[tokenOut?.chainId ?? ChainId.INK]
      )[0],
    enabled:
      Boolean(tokenIn) &&
      Boolean(tokenOut) &&
      tokenIn?.chainId !== tokenOut?.chainId,
  });

  const debouncedSlippage = useDebounce(slippage, 1000);

  const trade = useQuery({
    queryKey: [
      "smart-router",
      tokenIn,
      tokenOut,
      parsedAmount,
      debouncedSlippage,
      poolsCodeMapIn,
      poolsCodeMapOut,
      address,
    ],
    queryFn: async () => {
      try {
        if (
          !tokenIn ||
          !tokenOut ||
          !parsedAmount ||
          !parsedAmount.greaterThan(ZERO) ||
          !poolsCodeMapIn
        ) {
          return undefined;
        }

        if (tokenIn.chainId === tokenOut.chainId) {
          const trades = await getXFusionTrade(
            tokenIn,
            tokenOut,
            address ?? "0xec288809063df839a62a3a61dd28f2142592b170",
            debouncedSlippage,
            parsedAmount.quotient.toString(),
            poolsCodeMapIn
          );

          return { isBridge: false, ...trades };
        } else {
          const trades = await fetchBestAcross({
            tokenIn,
            tokenOut,
            amountIn: parsedAmount.quotient.toString(),
            recipient: address ?? "0xec288809063df839a62a3a61dd28f2142592b170",
            poolsCodeMapIn,
            poolsCodeMapOut,
            slippage: debouncedSlippage,
          });

          return { isBridge: true, ...trades };
        }
      } catch (err) {
        console.log(err);
      }
    },
    refetchInterval: 15000,
    enabled:
      Boolean(tokenIn) &&
      Boolean(tokenOut) &&
      Boolean(parsedAmount?.greaterThan(ZERO)),
    refetchOnWindowFocus: false,
  });
  return trade;
};

export default useSwapTrade;

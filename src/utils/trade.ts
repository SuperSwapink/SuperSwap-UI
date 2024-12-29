import { routeProcessor3Abi } from "@/packages/abi";
import { ChainId } from "@/packages/chain";
import { ROUTE_PROCESSOR_3_ADDRESS } from "@/packages/config";
import { Amount, Token, Type } from "@/packages/currency";
import { Percent } from "@/packages/math";
import { PoolCode, Router } from "@/packages/router";
import { RouteStatus } from "@/packages/tines";
import { Address, encodeFunctionData } from "viem";

export const getXFusionTrade = async (
  tokenIn: Type,
  tokenOut: Type,
  recipient: Address,
  slippage: number,
  amountIn: string,
  poolsCodeMap?: Map<string, PoolCode>
) => {
  if (!poolsCodeMap) return undefined;
  const route = Router.findBestRoute(
    poolsCodeMap,
    ChainId.INK,
    tokenIn,
    BigInt(amountIn),
    tokenOut,
    10000000,
    100
  );

  if (route && route.status === RouteStatus.Success) {
    const amountIn = Amount.fromRawAmount(tokenIn, route.amountInBI.toString());
    const amountOut = Amount.fromRawAmount(
      tokenOut,
      route.amountOutBI.toString()
    );

    const args = Router.routeProcessor3Params(
      poolsCodeMap,
      route,
      tokenIn,
      tokenOut,
      recipient,
      ROUTE_PROCESSOR_3_ADDRESS[ChainId.INK],
      [],
      +slippage / 100
    );

    return {
      tokenIn,
      tokenOut,
      recipient,
      slippage,
      amountIn: amountIn.quotient.toString(),
      amountInValue: 0,
      amountOut: amountOut.quotient.toString(),
      amountOutValue: 0,
      priceImpact: Number(
        (route.priceImpact
          ? new Percent(BigInt(Math.round(route.priceImpact * 10000)), 10000n)
          : new Percent(0)
        ).toFixed(6)
      ),
      data: args,
      type: "SuperSwap",
    };
  }
};

export const getXFusionTxData = async (trade: any) => {
  const targetData = encodeFunctionData({
    abi: routeProcessor3Abi,
    functionName: "processRoute",
    args: [
      trade.data?.tokenIn,
      trade.data?.amountIn,
      trade.data?.tokenOut,
      trade.data?.amountOutMin,
      trade.data?.to,
      trade.data?.routeCode,
    ],
  });
  return {
    amountIn: BigInt(trade?.amountIn ?? "0"),
    amountOut: BigInt(trade?.amountOut ?? "0"),
    args: {
      target: ROUTE_PROCESSOR_3_ADDRESS[ChainId.INK],
      tokenIn:
        trade.tokenIn instanceof Token
          ? trade.tokenIn.address
          : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      targetData,
      amountIn: BigInt(trade.data?.amountIn ?? "0"),
      fee: false,
    },
    value: trade?.data?.value,
  };
};

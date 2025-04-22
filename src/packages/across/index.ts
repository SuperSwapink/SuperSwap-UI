import { Chain, encodeFunctionData } from "viem";
import {
  ACROSS_PORTAL_ADDRESS,
  config,
  ROUTE_PROCESSOR_3_ADDRESS,
} from "../config";
import { Native, Token, Type, WETH9 } from "../currency";
import { HEXer, PoolCode, Router } from "../router";
import { createAcrossClient } from "@across-protocol/app-sdk";
import { RouteStatus } from "../tines";
import { routeProcessor3Abi } from "../abi";
import {
  SUPPORTED_ACROSS_ASSET_TYPE,
  SUPPORTED_ACROSS_ASSETS,
} from "./constants";

export const ACROSS_STATUS = {
  SUCCESS: 0,
  LOW_AMOUNT: 1,
  HIGH_AMOUNT: 2,
  FAILED: 3,
  NO_ROUTE: 4,
};

export const fetchBestAcross = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  recipient,
  poolsCodeMapIn,
  poolsCodeMapOut,
}: {
  tokenIn: Type;
  tokenOut: Type;
  slippage: Number;
  amountIn: string;
  recipient: `0x${string}`;
  poolsCodeMapIn?: Map<string, PoolCode>;
  poolsCodeMapOut?: Map<string, PoolCode>;
}) => {
  if (!poolsCodeMapIn || !poolsCodeMapOut) return undefined;
  const parsedAmountIn = BigInt(amountIn);

  const mediums = Object.keys(SUPPORTED_ACROSS_ASSETS[tokenIn.chainId]).filter(
    (item) =>
      Object.keys(SUPPORTED_ACROSS_ASSETS[tokenOut.chainId]).find(
        (k) => item === k
      )
  );

  const acrossResults = await Promise.all(
    mediums.map((item) =>
      getBestAcrossByMediumToken({
        tokenIn,
        tokenOut,
        amountIn: parsedAmountIn,
        slippage,
        recipient,
        mediumToken: item as SUPPORTED_ACROSS_ASSET_TYPE,
        poolsCodeMapIn,
        poolsCodeMapOut,
      })
    )
  );

  console.log(acrossResults);

  const bestResult = acrossResults.sort((a, b) =>
    BigInt(a?.amountOut ?? "0") < BigInt(b?.amountOut ?? "0") ? 1 : -1
  )?.[0];

  return bestResult;
};

export const getBestAcrossByMediumToken = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  recipient,
  mediumToken,
  poolsCodeMapIn,
  poolsCodeMapOut,
}: {
  tokenIn: Type;
  tokenOut: Type;
  slippage: Number;
  amountIn: bigint;
  mediumToken: SUPPORTED_ACROSS_ASSET_TYPE;
  recipient: `0x${string}`;
  poolsCodeMapIn: Map<string, PoolCode>;
  poolsCodeMapOut: Map<string, PoolCode>;
}) => {
  const mediumTokenIn = SUPPORTED_ACROSS_ASSETS[tokenIn.chainId][mediumToken];
  const mediumTokenOut = SUPPORTED_ACROSS_ASSETS[tokenOut.chainId][mediumToken];
  if (!mediumTokenIn || !mediumTokenOut) return;

  let originData;
  if (
    !tokenIn.isNative &&
    tokenIn.address.toLowerCase() === mediumTokenIn.address.toLowerCase()
  ) {
    originData = {
      amountOut: amountIn,
      amountOutMin: amountIn,
      calldata: {
        tokenIn: tokenIn.address,
        amountIn: amountIn,
        tokenOut: mediumTokenIn.address,
        amountOutMin: amountIn,
        routeCode: "0x",
      },
      priceImpact: 0,
    };
  } else {
    const route = Router.findBestRoute(
      poolsCodeMapIn,
      tokenIn.chainId,
      tokenIn,
      amountIn,
      mediumTokenIn,
      10000000,
      100
    );
    if (route.status !== RouteStatus.Success) {
      console.log("origin", route);
      return { status: ACROSS_STATUS.NO_ROUTE };
    }

    const isWrap =
      tokenIn.wrapped.address.toLowerCase() ===
      mediumTokenIn.address.toLowerCase();

    const args = Router.routeProcessor3Params(
      poolsCodeMapIn,
      route,
      tokenIn,
      mediumTokenIn,
      ACROSS_PORTAL_ADDRESS[tokenIn.chainId],
      ROUTE_PROCESSOR_3_ADDRESS[tokenIn.chainId],
      [],
      isWrap ? 0 : +slippage / 100
    );

    originData = {
      amountOut: route.amountOutBI,
      amountOutMin: args.amountOutMin,
      calldata: {
        tokenIn: args.tokenIn,
        amountIn: args.amountIn,
        tokenOut: args.tokenOut,
        amountOutMin: args.amountOutMin,
        to: args.to,
        routeCode: args.routeCode,
      },
      priceImpact: route.priceImpact ?? 0,
    };
  }

  const client = createAcrossClient({
    integratorId: "0x0076",
    chains: Object.values(config).map((item) => item[0].chain) as Chain[],
  });
  let estimatedQuote;
  try {
    estimatedQuote = await client.getQuote({
      route: {
        originChainId: tokenIn.chainId,
        destinationChainId: tokenOut.chainId,
        inputToken: mediumTokenIn.address,
        outputToken: mediumTokenOut.address,
      },
      recipient: ACROSS_PORTAL_ADDRESS[tokenOut.chainId],
      inputAmount: originData.amountOutMin,
      // crossChainMessage: estimatedDestMessage,
    });
  } catch (err: any) {
    const errMsg = err?.message ?? "";
    console.log(errMsg);
    return {
      status: errMsg?.includes("max")
        ? ACROSS_STATUS.HIGH_AMOUNT
        : errMsg?.includes("low")
        ? ACROSS_STATUS.LOW_AMOUNT
        : ACROSS_STATUS.FAILED,
    };
  }

  let destData;
  if (
    !tokenOut.isNative &&
    tokenOut.address.toLowerCase() === mediumTokenOut.address.toLowerCase()
  ) {
    destData = {
      amountOut: estimatedQuote.deposit.outputAmount,
      message: new HEXer()
        .address(tokenOut.address)
        .address(recipient)
        .toHexString(),
      priceImpact: 0,
    };
  } else {
    const route = Router.findBestRoute(
      poolsCodeMapOut,
      tokenOut.chainId,
      mediumTokenOut,
      estimatedQuote.deposit.outputAmount,
      tokenOut,
      10000000,
      100
    );

    if (route.status !== RouteStatus.Success) {
      console.log("dest", route);
      return { status: ACROSS_STATUS.NO_ROUTE };
    }

    const args = Router.routeProcessor3Params(
      poolsCodeMapOut,
      route,
      mediumTokenOut,
      tokenOut,
      recipient,
      ROUTE_PROCESSOR_3_ADDRESS[tokenOut.chainId],
      [],
      +slippage / 100
    );
    destData = {
      amountOut: route.amountOutBI,
      message: new HEXer()
        .address(args.tokenOut)
        .uint256(0n)
        .address(args.to)
        .bytes(args.routeCode)
        .toHexString(),
      priceImpact: route.priceImpact ?? 0,
    };
  }

  const quote = await client.getQuote({
    route: {
      originChainId: tokenIn.chainId,
      destinationChainId: tokenOut.chainId,
      inputToken: mediumTokenIn.address,
      outputToken: mediumTokenOut.address,
    },
    recipient: ACROSS_PORTAL_ADDRESS[tokenOut.chainId],
    inputAmount: originData.amountOutMin,
    crossChainMessage: destData.message,
  });

  return {
    status: ACROSS_STATUS.SUCCESS,
    depositData: quote.deposit,
    originalData: originData,
    destData,
    amountIn: amountIn,
    amountOut: destData.amountOut?.toString(),
    mediumToken,
    tokenIn,
    tokenOut,
    priceImpact:
      (1 -
        (1 - originData.priceImpact) *
          (1 - destData.priceImpact) *
          Number(
            Number(quote.deposit.outputAmount) /
              Number(quote.deposit.inputAmount)
          )) *
      100,
  };
};

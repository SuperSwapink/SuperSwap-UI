import { Chain, encodeFunctionData } from "viem"
import {
  ACROSS_PORTAL_ADDRESS,
  config,
  ROUTE_PROCESSOR_3_ADDRESS,
} from "../config"
import { Native, Type, WETH9 } from "../currency"
import { HEXer, PoolCode, Router } from "../router"
import { createAcrossClient } from "@across-protocol/app-sdk"
import { RouteStatus } from "../tines"
import { routeProcessor3Abi } from "../abi"

export const ACROSS_STATUS = {
  SUCCESS: 0,
  LOW_AMOUNT: 1,
  HIGH_AMOUNT: 2,
  FAILED: 3,
}

export const fetchBestAcross = async ({
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  recipient,
  poolsCodeMapIn,
  poolsCodeMapOut,
}: {
  tokenIn: Type
  tokenOut: Type
  slippage: Number
  amountIn: string
  recipient: `0x${string}`
  poolsCodeMapIn?: Map<string, PoolCode>
  poolsCodeMapOut?: Map<string, PoolCode>
}) => {
  if (!poolsCodeMapIn || !poolsCodeMapOut) return undefined
  const parsedAmountIn = BigInt(amountIn)
  let originData
  if (tokenIn.isNative) {
    originData = {
      amountOut: parsedAmountIn,
      amountOutMin: parsedAmountIn,
      calldata: {
        tokenIn: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        amoutIn: parsedAmountIn,
        tokenOut: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        amoutOutMin: parsedAmountIn,
        routeCode: '0x',
      },
      priceImpact: 0,
    }
  } else {
    const route = Router.findBestRoute(
      poolsCodeMapIn,
      tokenIn.chainId,
      tokenIn,
      parsedAmountIn,
      Native.onChain(tokenIn.chainId),
      10000000,
      100
    )
    if (route.status !== RouteStatus.Success) {
      console.log(poolsCodeMapIn)
      throw Error("No route in original chain")
    }

    const args = Router.routeProcessor3Params(
      poolsCodeMapIn,
      route,
      tokenIn,
      Native.onChain(tokenIn.chainId),
      ACROSS_PORTAL_ADDRESS[tokenIn.chainId],
      ROUTE_PROCESSOR_3_ADDRESS[tokenIn.chainId],
      [],
      +slippage / 100
    )

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
    }
  }

  const client = createAcrossClient({
    integratorId: "0x0076",
    chains: Object.values(config).map((item) => item[0].chain) as Chain[],
  })
  let estimatedQuote
  try {
    estimatedQuote = await client.getQuote({
      route: {
        originChainId: tokenIn.chainId,
        destinationChainId: tokenOut.chainId,
        inputToken: Native.onChain(tokenIn.chainId).wrapped.address,
        outputToken: Native.onChain(tokenOut.chainId).wrapped.address,
        isNative: true,
      },
      recipient: ACROSS_PORTAL_ADDRESS[tokenOut.chainId],
      inputAmount: originData.amountOutMin,
      // crossChainMessage: estimatedDestMessage,
    })
  } catch (err: any) {
    const errMsg = err?.message ?? ""
    console.log(errMsg)
    return {
      status: errMsg?.includes("max")
        ? ACROSS_STATUS.HIGH_AMOUNT
        : errMsg?.includes("low")
          ? ACROSS_STATUS.LOW_AMOUNT
          : ACROSS_STATUS.FAILED,
    }
  }

  let destData
  if (
    !tokenOut.isNative &&
    tokenOut.address.toLowerCase() ===
    WETH9[tokenOut.chainId].address.toLowerCase()
  ) {
    destData = {
      amountOut: estimatedQuote.deposit.outputAmount,
      message: new HEXer()
        .address(tokenOut.address)
        .address(recipient)
        .toHexString(),
      priceImpact: 0,
    }
  } else {
    const route = Router.findBestRoute(
      poolsCodeMapOut,
      tokenOut.chainId,
      WETH9[tokenOut.chainId],
      estimatedQuote.deposit.outputAmount,
      tokenOut,
      10000000,
      100
    )

    if (route.status !== RouteStatus.Success) {
      throw Error("No route in target chain")
    }

    const args = Router.routeProcessor3Params(
      poolsCodeMapOut,
      route,
      WETH9[tokenOut.chainId],
      tokenOut,
      recipient,
      ROUTE_PROCESSOR_3_ADDRESS[tokenOut.chainId],
      [],
      +slippage / 100
    )
    destData = {
      amountOut: route.amountOutBI,
      message: new HEXer()
        .address(args.tokenOut)
        .uint256(0n)
        .address(args.to)
        .bytes(args.routeCode)
        .toHexString(),
      priceImpact: route.priceImpact ?? 0,
    }
  }

  const quote = await client.getQuote({
    route: {
      originChainId: tokenIn.chainId,
      destinationChainId: tokenOut.chainId,
      inputToken: Native.onChain(tokenIn.chainId).wrapped.address,
      outputToken: Native.onChain(tokenOut.chainId).wrapped.address,
      isNative: true,
    },
    recipient: ACROSS_PORTAL_ADDRESS[tokenOut.chainId],
    inputAmount: originData.amountOutMin,
    crossChainMessage: destData.message,
  })

  console.log(estimatedQuote.deposit.outputAmount, quote.deposit.outputAmount)

  return {
    status: ACROSS_STATUS.SUCCESS,
    depositData: quote.deposit,
    originalData: originData,
    destData,
    amountIn: amountIn,
    amountOut: destData.amountOut?.toString(),
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
  }
}

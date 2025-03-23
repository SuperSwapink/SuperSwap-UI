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
      calldata: "",
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
      calldata: encodeFunctionData({
        abi: routeProcessor3Abi,
        functionName: "processRoute",
        args: [
          args.tokenIn,
          args.amountIn,
          args.tokenOut,
          args.amountOutMin,
          args.to,
          args.routeCode,
        ],
      }),
    }
  }

  const client = createAcrossClient({
    integratorId: "0x0076",
    chains: Object.values(config).map((item) => item[0].chain) as Chain[],
  })
  const estimatedQuote = await client.getQuote({
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

  console.log(quote)

  return {
    depositData: quote.deposit,
    originalData: originData,
    destData,
    amountIn: amountIn,
    amountOut: destData.amountOut?.toString(),
    tokenIn,
    tokenOut,
  }
}

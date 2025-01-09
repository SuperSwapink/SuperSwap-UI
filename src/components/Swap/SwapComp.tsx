import Coin from "../svgs/Coin";
import InkSwapImg from "../../assets/swap/InkSwap.png";
import InkySwapImg from "../../assets/swap/InkySwap.png";
import SquidSwapImg from "../../assets/swap/SquidSwap.png";
import DyorSwapImg from "../../assets/swap/DyorSwap.png";
import ReservoirSwapImg from "../../assets/swap/ReservoirSwap.png";
import Image from "next/image";
import useSwapTrade from "@/hooks/useSwapTrade";
import useSwapParams from "@/hooks/useSwapParams";
import { Amount } from "@/packages/currency";
import { LiquidityProviders } from "@/packages/router";

const images = {
  [LiquidityProviders.InkSwap]: InkSwapImg,
  [LiquidityProviders.InkySwap]: InkySwapImg,
  [LiquidityProviders.SquidSwap]: SquidSwapImg,
  [LiquidityProviders.DyorSwap]: DyorSwapImg,
  [LiquidityProviders.ReservoirSwap]: ReservoirSwapImg,
} as any;

const SwapComp = () => {
  const trade = useSwapTrade();
  const { tokenIn, tokenOut } = useSwapParams();

  const tradeProfit =
    tokenIn &&
    tokenOut &&
    trade &&
    trade.data &&
    trade.data.bestRoute &&
    BigInt(trade.data.amountOut) >
      BigInt(trade.data.bestRoute.amountOutBI.toString())
      ? Amount.fromRawAmount(tokenOut, trade.data.amountOut).subtract(
          Amount.fromRawAmount(
            tokenOut,
            trade.data.bestRoute.amountOutBI.toString()
          )
        )
      : undefined;

  return trade.data && tradeProfit ? (
    <div className="flex items-center bg-white dark:bg-[#131823] relative p-4 mt-4 rounded-lg md:rounded-[32px] shadow-[0_12px_24px_#e2e9f6] dark:shadow-none">
      <div className="rounded-full p-2.5 bg-[#2f8af529] w-fit mr-6">
        <Coin className="text-[#2f8af5]" />
      </div>
      <div className="text-sm font-semibold text-[#6c86ad]">
        <div>
          You&apos;re getting {tradeProfit.toSignificant(6)} more {tokenOut?.symbol} for the same swap
        </div>
        <div className="flex items-center">
          Compared to&nbsp;
          <div className="flex items-center justify-center border border-[#e3e7ee] dark:border-[#202835] w-5 h-5 p-0.5 rounded-md">
            <Image
              src={images[trade.data.bestRoute.provider].src}
              width={images[trade.data.bestRoute.provider].width}
              height={images[trade.data.bestRoute.provider].height}
              alt="swap"
              className=""
            />
          </div>
          &nbsp; {trade.data.bestRoute.provider}
        </div>
      </div>
    </div>
  ) : null;
};

export default SwapComp;

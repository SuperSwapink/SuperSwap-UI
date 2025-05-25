import { ChainId } from "../../chain";
import { PublicClient } from "viem";

import { LiquidityProviders } from "./LiquidityProvider";
import { UniswapV3BaseProvider } from "./UniswapV3Base";

export class UniswapV3Provider extends UniswapV3BaseProvider {
  constructor(chainId: ChainId, web3Client: PublicClient) {
    const factory = {
      [ChainId.ETHEREUM]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      [ChainId.OP]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      [ChainId.UNICHAIN]: "0x1F98400000000000000000000000000000000003",
      [ChainId.POLYGON]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      // [ChainId.ZKSYNC]: "0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422",
      [ChainId.WORLDCHAIN]: "0x7a5028BDa40e7B173C278C5342087826455ea25a",
      [ChainId.BASE]: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
      [ChainId.ARBITRUM]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      [ChainId.BLAST]: "0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd",
      [ChainId.ZORA]: "0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb",
    } as const;

    const initCodeHash = {
      [ChainId.ETHEREUM]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.OP]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.UNICHAIN]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.POLYGON]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      // [ChainId.ZKSYNC]:
      //   "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.WORLDCHAIN]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.BASE]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.ARBITRUM]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.BLAST]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
      [ChainId.ZORA]:
        "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54",
    } as const;

    const tickLens = {
      [ChainId.ETHEREUM]: "0xbfd8137f7d1516D3ea5cA83523914859ec47F573",
      [ChainId.OP]: "0xbfd8137f7d1516D3ea5cA83523914859ec47F573",
      [ChainId.UNICHAIN]: "0xD5D76fa166AB8d8AD4C9f61AaA81457b66cBE443",
      [ChainId.POLYGON]: "0xbfd8137f7d1516d3ea5ca83523914859ec47f573",
      // [ChainId.ZKSYNC]: "0xe10FF11b809f8EE07b056B452c3B2caa7FE24f89",
      [ChainId.WORLDCHAIN]: "0xE61df0CaC9d85876aCE5E3037005D80943570623",
      [ChainId.BASE]: "0x0CdeE061c75D43c82520eD998C23ac2991c9ac6d",
      [ChainId.ARBITRUM]: "0xbfd8137f7d1516D3ea5cA83523914859ec47F573",
      [ChainId.BLAST]: "0x2E95185bCdD928a3e984B7e2D6560Ab1b17d7274",
      [ChainId.ZORA]: "0x209AAda09D74Ad3B8D0E92910Eaf85D2357e3044",
    } as const;

    super(chainId, web3Client, factory, initCodeHash, tickLens);
  }
  getType(): LiquidityProviders {
    return LiquidityProviders.UniswapV3;
  }
  getPoolProviderName(): string {
    return "UniswapV3";
  }
}

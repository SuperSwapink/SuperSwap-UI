import { aerodromeSugarAbi } from "@/packages/abi/aerodromeSugarAbi";
import { ChainId } from "@/packages/chain";
import { DEFAULT_TOKEN_LIST, PRIMARY_TOKEN_LIST } from "@/packages/config";
import { Native, Token } from "@/packages/currency";
import { useReadContract } from "wagmi";
import useLocalTokenStorage from "./useLocalTokenStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAddress } from "viem";

const useTokenList = (chainId: ChainId, primaryTokens?: boolean) => {
  const { localTokenList } = useLocalTokenStorage();
  const { data: baseAerodromeData } = useReadContract({
    abi: aerodromeSugarAbi,
    functionName: "tokens",
    args: [5000n, 0n, "0x0000000000000000000000000000000000000000", []],
    address: "0x6f8ea68a1a66e49e16a470bcf6fe2a3a7b94cde9",
    chainId: ChainId.BASE,
  });

  const { data: opVelodromeData } = useReadContract({
    abi: aerodromeSugarAbi,
    functionName: "tokens",
    args: [5000n, 0n, "0x0000000000000000000000000000000000000000", []],
    address: "0xA64db2D254f07977609def75c3A7db3eDc72EE1D",
    chainId: ChainId.OP,
  });

  const { data: liskVelodromeData } = useReadContract({
    abi: aerodromeSugarAbi,
    functionName: "tokens",
    args: [5000n, 0n, "0x0000000000000000000000000000000000000000", []],
    address: "0x2DCD9B33F0721000Dc1F8f84B804d4CFA23d7713",
    chainId: ChainId.LISK,
  });

  const { data: modeVelodromeData } = useReadContract({
    abi: aerodromeSugarAbi,
    functionName: "tokens",
    args: [5000n, 0n, "0x0000000000000000000000000000000000000000", []],
    address: "0x9ECd2f44f72E969fa3F3C4e4F63bc61E0C08F31F",
    chainId: ChainId.MODE,
  });

  const { data: camelotData } = useQuery({
    queryKey: ["camelot-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://api.camelot.exchange/tokens?chainId=42161"
        );
        if (data.data.tokens) {
          return Object.values(data.data.tokens)
            .filter(
              (item: any) =>
                item.whitelisted &&
                !PRIMARY_TOKEN_LIST.find(
                  (k) =>
                    k.address.toLowerCase() === item.address.toLowerCase() &&
                    k.chainId === ChainId.ARBITRUM
                )
            )
            .map(
              (item: any) =>
                new Token({
                  address: item.address,
                  decimals: Number(item.decimals),
                  chainId: ChainId.ARBITRUM,
                  name: item.name,
                  symbol: item.symbol,
                  icon: item.logoURI,
                })
            );
        }
        return [];
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: ethUniswapData } = useQuery({
    queryKey: ["uniswap-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://raw.githubusercontent.com/Uniswap/default-token-list/refs/heads/main/src/tokens/mainnet.json"
        );
        return Object.values(data)
          .filter(
            (item: any) =>
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === item.address.toLowerCase() &&
                  k.chainId === ChainId.ETHEREUM
              )
          )
          .map(
            (item: any) =>
              new Token({
                address: item.address,
                decimals: item.decimals,
                chainId: ChainId.ETHEREUM,
                name: item.name,
                symbol: item.symbol,
                icon: `https://cdn.sushi.com/image/upload/f_auto,c_limit,w_96/tokens/1/${item.address.toLowerCase()}.jpg`,
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: polygonQuickswapData } = useQuery({
    queryKey: ["quickswap-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://unpkg.com/quickswap-default-token-list@1.3.77/build/quickswap-default.tokenlist.json"
        );
        return data.tokens
          .filter(
            (token: any) =>
              token.chainId === ChainId.POLYGON &&
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === token.address.toLowerCase() &&
                  k.chainId === ChainId.POLYGON
              )
          )
          .map(
            (token: any) =>
              new Token({
                chainId: ChainId.POLYGON,
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                icon: `https://cdn.sushi.com/image/upload/f_auto,c_limit,w_96/tokens/137/${token.address.toLowerCase()}.jpg`,
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: soneiumData } = useQuery({
    queryKey: ["soneium-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://tokens.coingecko.com/soneium/all.json"
        );
        return data.tokens
          .filter(
            (token: any) =>
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === token.address.toLowerCase() &&
                  k.chainId === ChainId.SONEIUM
              )
          )
          .map(
            (token: any) =>
              new Token({
                chainId: ChainId.SONEIUM,
                address: getAddress(token.address),
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                icon: token.logoURI.replace("thumb", "standard"),
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: unichainData } = useQuery({
    queryKey: ["unichain-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://tokens.coingecko.com/unichain/all.json"
        );
        return data.tokens
          .filter(
            (token: any) =>
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === token.address.toLowerCase() &&
                  k.chainId === ChainId.UNICHAIN
              )
          )
          .map(
            (token: any) =>
              new Token({
                chainId: ChainId.UNICHAIN,
                address: getAddress(token.address),
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                icon: token.logoURI.replace("thumb", "standard"),
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: linearData } = useQuery({
    queryKey: ["linea-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://tokens.coingecko.com/linea/all.json"
        );
        return data.tokens
          .filter(
            (token: any) =>
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === token.address.toLowerCase() &&
                  k.chainId === ChainId.LINEA
              )
          )
          .map(
            (token: any) =>
              new Token({
                chainId: ChainId.LINEA,
                address: getAddress(token.address),
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                icon: token.logoURI.replace("thumb", "standard"),
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: blastData } = useQuery({
    queryKey: ["blast-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://tokens.coingecko.com/blast/all.json"
        );
        console.log(data);
        return data.tokens
          .filter(
            (token: any) =>
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === token.address.toLowerCase() &&
                  k.chainId === ChainId.BLAST
              )
          )
          .map(
            (token: any) =>
              new Token({
                chainId: ChainId.BLAST,
                address: getAddress(token.address),
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                icon: token?.logoURI?.replace("thumb", "standard"),
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const { data: scrollData } = useQuery({
    queryKey: ["scroll-tokens"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://tokens.coingecko.com/scroll/all.json"
        );
        console.log(data);
        return data.tokens
          .filter(
            (token: any) =>
              !PRIMARY_TOKEN_LIST.find(
                (k) =>
                  k.address.toLowerCase() === token.address.toLowerCase() &&
                  k.chainId === ChainId.SCROLL
              )
          )
          .map(
            (token: any) =>
              new Token({
                chainId: ChainId.SCROLL,
                address: getAddress(token.address),
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                icon: token?.logoURI?.replace("thumb", "standard"),
              })
          );
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });

  const defaultTokens = [
    Native.onChain(chainId),
    ...(primaryTokens ? PRIMARY_TOKEN_LIST : DEFAULT_TOKEN_LIST)
      .filter((item) => item.chainId === chainId)
      .map((item) =>
        "native" in item
          ? Native.onChain(chainId)
          : new Token({
              chainId: item.chainId,
              address: item.address,
              decimals: item.decimals,
              name: item.name,
              symbol: item.symbol,
              icon: item.icon,
              category: item.category,
            })
      ),
  ];

  const filteredAerodromeTokens = baseAerodromeData
    ?.filter(
      (item) =>
        !defaultTokens.find(
          (k) =>
            k.chainId === ChainId.BASE &&
            !k.isNative &&
            k.address.toLowerCase() === item.token_address.toLowerCase()
        ) && item.listed
    )
    ?.filter(
      (item, i, data) =>
        data.findIndex(
          (k) =>
            k.token_address.toLowerCase() === item.token_address.toLowerCase()
        ) === i
    );

  const aerodromeTokens = filteredAerodromeTokens?.map(
    (item) =>
      new Token({
        address: item.token_address,
        chainId: ChainId.BASE,
        decimals: item.decimals,
        name: item.symbol,
        symbol: item.symbol,
        icon: `https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/8453/${item.token_address.toLowerCase()}/logo.svg`,
      })
  );

  const filteredOpVelodromeTokens = opVelodromeData
    ?.filter(
      (item) =>
        !defaultTokens.find(
          (k) =>
            k.chainId === ChainId.OP &&
            !k.isNative &&
            k.address.toLowerCase() === item.token_address.toLowerCase()
        ) && item.listed
    )
    ?.filter(
      (item, i, data) =>
        data.findIndex(
          (k) =>
            k.token_address.toLowerCase() === item.token_address.toLowerCase()
        ) === i
    );

  const opVelodromeTokens = filteredOpVelodromeTokens?.map(
    (item) =>
      new Token({
        address: item.token_address,
        chainId: ChainId.OP,
        decimals: item.decimals,
        name: item.symbol,
        symbol: item.symbol,
        icon: `https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/10/${item.token_address.toLowerCase()}/logo.svg`,
      })
  );

  const filteredLiskVelodromeTokens = liskVelodromeData
    ?.filter(
      (item) =>
        !defaultTokens.find(
          (k) =>
            k.chainId === ChainId.LISK &&
            !k.isNative &&
            k.address.toLowerCase() === item.token_address.toLowerCase()
        ) && item.listed
    )
    ?.filter(
      (item, i, data) =>
        data.findIndex(
          (k) =>
            k.token_address.toLowerCase() === item.token_address.toLowerCase()
        ) === i
    );

  const liskVelodromeTokens = filteredLiskVelodromeTokens?.map(
    (item) =>
      new Token({
        address: item.token_address,
        chainId: ChainId.LISK,
        decimals: item.decimals,
        name: item.symbol,
        symbol: item.symbol,
        icon: `https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/1135/${item.token_address.toLowerCase()}/logo.svg`,
      })
  );

  const filteredModeVelodromeTokens = modeVelodromeData
    ?.filter(
      (item) =>
        !defaultTokens.find(
          (k) =>
            k.chainId === ChainId.MODE &&
            !k.isNative &&
            k.address.toLowerCase() === item.token_address.toLowerCase()
        ) && item.listed
    )
    ?.filter(
      (item, i, data) =>
        data.findIndex(
          (k) =>
            k.token_address.toLowerCase() === item.token_address.toLowerCase()
        ) === i
    );

  const modeVelodromeTokens = filteredModeVelodromeTokens?.map(
    (item) =>
      new Token({
        address: item.token_address,
        chainId: ChainId.MODE,
        decimals: item.decimals,
        name: item.symbol,
        symbol: item.symbol,
        icon: `https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/34443/${item.token_address.toLowerCase()}/logo.svg`,
      })
  );

  const localTokens = localTokenList?.map(
    (item) =>
      new Token({
        chainId: item.chainId,
        address: item.address,
        name: item.name,
        symbol: item.symbol,
        decimals: item.decimals,
        category: item.category,
        icon: item.icon,
      })
  );

  return [
    ...defaultTokens,
    ...(aerodromeTokens ?? []),
    ...(opVelodromeTokens ?? []),
    ...(liskVelodromeTokens ?? []),
    ...(modeVelodromeTokens ?? []),
    ...(localTokens ?? []),
    ...(camelotData ?? []),
    ...(ethUniswapData ?? []),
    ...(polygonQuickswapData ?? []),
    ...(soneiumData ?? []),
    ...(unichainData ?? []),
    ...(linearData ?? []),
    ...(blastData ?? []),
    ...(scrollData ?? []),
  ].filter((item, i, data) => data.findIndex((k) => k.id === item.id) === i);
};

export default useTokenList;

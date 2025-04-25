import { aerodromeSugarAbi } from "@/packages/abi/aerodromeSugarAbi";
import { ChainId } from "@/packages/chain";
import { DEFAULT_TOKEN_LIST, PRIMARY_TOKEN_LIST } from "@/packages/config";
import { Native, Token } from "@/packages/currency";
import { useReadContract } from "wagmi";
import useLocalTokenStorage from "./useLocalTokenStorage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

  const { data: uniswapData } = useQuery({
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
                icon: item.logoURI?.replace("ipfs://", "https://ipfs.io/ipfs/"),
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

  const velodromeTokens = filteredOpVelodromeTokens?.map(
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
    ...(velodromeTokens ?? []),
    ...(localTokens ?? []),
    ...(camelotData ?? []),
    ...(uniswapData ?? []),
  ].filter((item, i, data) => data.findIndex((k) => k.id === item.id) === i);
};

export default useTokenList;

import { useQuery } from "@tanstack/react-query";
import { getAxios } from "./axios";
import { NftCollectionParams, NftParams } from "../interfaces/Nft";
// import { useQuery } from "@tanstack/react-query";
// import { AxiosError } from "axios";

export function useGetNfts({
  address,
  chain,
  limit,
  cursor,
  token_addresses,
}: NftParams) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["get-nfts", address, chain, limit, cursor, token_addresses],
    queryFn: () =>
      getAxios({
        url: `/api/nft?address=${address}&chain=${chain}&limit=${limit}${
          cursor ? `&cursor=${cursor}` : ""
        }${token_addresses ? `&token_addresses=${token_addresses}` : ""}`,
      }),
    enabled: !!address,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const isEmpty = !data;

  return {
    nftsData: data || null,
    nftsLoading: isLoading,
    nftsFetching: isFetching,
    nftsError: error,
    nftsEmpty: isEmpty,
  };
}

export function useGetNftCollections({
  address,
  chain,
  limit,
  cursor,
}: NftCollectionParams) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["get-nft-collections", address, chain, limit, cursor],
    queryFn: () =>
      getAxios({
        url: `/api/collections?address=${address}&chain=${chain}&limit=${limit}${
          cursor ? `&cursor=${cursor}` : ""
        }`,
      }),
    enabled: !!address,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const isEmpty = !data;

  return {
    collectionsData: data || null,
    collectionsLoading: isLoading,
    collectionsFetching: isFetching,
    collectionsError: error,
    collectionsEmpty: isEmpty,
  };
}

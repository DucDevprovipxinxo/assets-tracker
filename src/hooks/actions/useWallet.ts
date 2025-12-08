import { useQuery } from "@tanstack/react-query";
import { getAxios } from "./axios";
// import { useQuery } from "@tanstack/react-query";
// import { AxiosError } from "axios";

type UseGetWalletParams = {
  address: string;
  chain: string;
};

export function useGetWallet({
  address,
  chain,
}: UseGetWalletParams) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["get-wallet", address, chain],
    queryFn: () =>
      getAxios({
        url: `/api/wallet?address=${address}&chain=${chain}`,
      }),
    enabled: !!address,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const isEmpty = !data;

  return {
    walletData: data || null,
    walletLoading: isLoading,
    walletFetching: isFetching,
    walletError: error,
    walletEmpty: isEmpty,
  };
}

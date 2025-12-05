import apiClient from "@/axios";
// import { IFiltersRequestParams } from "../interfaces/axios";
import { AxiosInstance } from "axios";

interface Props {
  url: string;
  client?: AxiosInstance;
}
export const getAxios = async ({ url, client = apiClient }: Props) => {
  const response = await client.get(url);
  return response.data;
};

export function catchAsync<T>(fn: () => Promise<T>): () => Promise<T> {
  return async () => {
    try {
      return await fn();
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };
}

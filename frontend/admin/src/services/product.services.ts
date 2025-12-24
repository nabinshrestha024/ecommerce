import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const getProducts = async () => {
  const response = await axiosInstance.get(endpoint.products);
  return response.data;
};
export const postProduct = async (productData: FormData) => {
  return await axiosInstance.post(endpoint.products, productData);
};

import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getProductById = async (productId: number) => {
  const res = await axiosInstance.get(`${endpoint.FETCH_PRODUCT}/${productId}`);
  return res.data;
};

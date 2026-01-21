import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export interface CartDataType {
  variantId: number;
  quantity: number;
}
export const mergeCart = async (cartData: CartDataType[]) => {
  const res = await axiosInstance.post(endpoint.MERGECART, cartData);
  return res.data;
};

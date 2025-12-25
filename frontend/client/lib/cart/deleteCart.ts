import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteCart = async (cartId: number) => {
  const res = await axiosInstance.delete(endpoint.DELETECART, {
    params: { cartId: cartId },
  });
  return res.data;
};

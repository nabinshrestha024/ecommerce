import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addToCart = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  const res = await axiosInstance.post(endpoint.ADDTOCART, {
    productId,
    quantity,
  });
  return res.data;
};

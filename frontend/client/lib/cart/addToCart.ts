import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addToCart = async ({
  quantity,
  variantId,
}: {
  quantity: number;
  variantId: number;
}) => {
  const res = await axiosInstance.post(endpoint.ADDTOCART, {
    variantId,
    quantity,
  });
  return res.data;
};

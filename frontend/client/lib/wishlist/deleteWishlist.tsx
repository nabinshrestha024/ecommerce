import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteWishlist = async (productId: number) => {
  const res = await axiosInstance.delete(endpoint.DELETE_WISHLIST, {
    params: {
      productId,
    },
  });
  return res.data;
};

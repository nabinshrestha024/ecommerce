import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteWishlist = async (wishlistId: number) => {
  const res = await axiosInstance.delete(endpoint.DELETE_WISHLIST, {
    params: {
      wishlistId: wishlistId,
    },
  });
  return res.data;
};

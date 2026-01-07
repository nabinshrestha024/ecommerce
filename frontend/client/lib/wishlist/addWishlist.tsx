import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addWishlist = async (variantId: number) => {
  const res = await axiosInstance.post(endpoint.ADD_WISHLIST, null, {
    params: {
      VariantId: variantId,
    },
  });

  return res.data;
};

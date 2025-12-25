import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
import { wishlistData } from "@/components/TrendingProduct/component/TrendingProductCard";

export const addWishlist = async (data: wishlistData) => {
  const res = await axiosInstance.post(endpoint.ADD_WISHLIST, null, {
    params: {
      productId: data,
    },
  });
  return res.data;
};

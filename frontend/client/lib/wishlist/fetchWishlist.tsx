import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchWishlist = async () => {
  const res = await axiosInstance.get(endpoint.FETCH_WISHLIST);
  return res.data;
};

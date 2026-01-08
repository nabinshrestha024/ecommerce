import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchProductReview = async (productId: number) => {
  const res = await axiosInstance.get(`${endpoint.REVIEW}`, {
    params: { productId: productId },
  });
  return res.data;
};

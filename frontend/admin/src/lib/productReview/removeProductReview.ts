import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const removeProductReview = async (reviewId: number) => {
  const res = await axiosInstance.delete(
    `${endpoint.DELETEPRODUCTREVIEW}?reviewId=${reviewId}`,
  );
  return res.data;
};

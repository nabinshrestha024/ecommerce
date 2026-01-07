import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const removeWebsiteReview = async (reviewId: number) => {
  const res = await axiosInstance.delete(
    `${endpoint.DELETEWEBSITEREVIEW}?reviewId=${reviewId}`,
  );
  return res.data;
};

import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchProductReview = async (page: number) => {
  const res = await axiosInstance.get(
    `${endpoint.FETCHPRODUCTREVIEW}?Page=${page}&PageSize=10`,
  );
  return res.data;
};

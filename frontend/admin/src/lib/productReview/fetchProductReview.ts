import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchProductReview = async (page: number, pageSize: number) => {
  const res = await axiosInstance.get(
    `${endpoint.FETCHPRODUCTREVIEW}?Page=${page}&PageSize=${pageSize}`,
  );
  return res.data;
};

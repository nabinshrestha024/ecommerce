import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchWebsiteReview = async (page: number) => {
  const res = await axiosInstance.get(
    `${endpoint.FETCHWEBSITEREVIEW}?Page=${page}&PageSize=10`,
  );
  return res.data;
};

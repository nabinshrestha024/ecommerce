import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchWebsiteReview = async (page: number, pageSize: number) => {
  const res = await axiosInstance.get(
    `${endpoint.FETCHWEBSITEREVIEW}?Page=${page}&PageSize=${pageSize}`,
  );
  return res.data;
};

import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const postCategory = async (data: FormData) => {
  const res = await axiosInstance.post(endpoint.FETCH_CATEGORY, data);
  return res.data;
};

import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const postBanner = async (data: FormData) => {
  const res = await axiosInstance.post(endpoint.FETCH_BANNER, data);
  return res.data;
};

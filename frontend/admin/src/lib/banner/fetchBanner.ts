import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchBanner = async () => {
  const res = await axiosInstance.get(endpoint.FETCH_BANNER);
  return res.data;
};

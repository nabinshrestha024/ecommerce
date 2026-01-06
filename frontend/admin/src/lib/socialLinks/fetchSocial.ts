import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchSocial = async () => {
  const res = await axiosInstance.get(endpoint.SOCIALLINKS);
  return res.data;
};

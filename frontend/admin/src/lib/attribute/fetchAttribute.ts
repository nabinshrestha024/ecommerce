import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const Attribute = async () => {
  const res = await axiosInstance.get(endpoint.ATTRIBUTES);
  return res.data;
};

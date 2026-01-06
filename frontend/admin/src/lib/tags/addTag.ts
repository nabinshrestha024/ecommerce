import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addTag = async (name: string) => {
  const res = await axiosInstance.post(endpoint.TAGS, { name });
  return res.data;
};

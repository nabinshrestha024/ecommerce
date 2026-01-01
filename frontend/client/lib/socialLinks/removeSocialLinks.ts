import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const removeSocialLinks = async (id: number) => {
  const res = await axiosInstance.delete(`${endpoint.SOCIALLINKS}/${id}`);
  return res.data;
};

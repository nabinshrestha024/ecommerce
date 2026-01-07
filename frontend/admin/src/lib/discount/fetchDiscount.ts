import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const Discount = async () => {
  const res = await axiosInstance.get(`${endpoint.DISCOUNT}/get`);
  return res.data;
};

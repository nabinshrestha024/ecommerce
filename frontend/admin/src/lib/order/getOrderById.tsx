import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getOrderById = async (orderId: number) => {
  const res = await axiosInstance.get(`${endpoint.FETCHORDERBYID}/${orderId}`);
  return res?.data;
};

import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
export const cancelOrder = async (orderId: number) => {
  const res = await axiosInstance.put(
    `${endpoint.FETCHORDERBYID}/${orderId}/cancel`,
  );
  return res?.data;
};

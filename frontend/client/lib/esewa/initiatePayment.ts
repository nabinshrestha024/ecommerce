import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const initiatePayment = async (orderId: number) => {
  const res = await axiosInstance.post(endpoint.ESEWAPAYMENT, { orderId });
  return res.data;
};

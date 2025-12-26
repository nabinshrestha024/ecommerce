import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const paymentSuccess = async (data: string) => {
  const res = await axiosInstance.get(endpoint.PAYMENTSUCCESS, {
    params: { data },
  });
  return res.data;
};

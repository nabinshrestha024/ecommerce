import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const editOrder = async ({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) => {
  try {
    const res = await axiosInstance.put(
      `${endpoint.FETCH_ORDER}/${orderId}/status`,
      { status },
    );
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    }
  }
};

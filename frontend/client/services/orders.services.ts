import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const getOrders = async () => {
  try {
    const reposnse = await axiosInstance.get(endpoint.FETCHORDER);
    return reposnse.data;
  } catch (error) {
    throw error;
  }
};

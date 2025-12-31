import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteUser = async (userId: number) => {
  try {
    const res = await axiosInstance.delete(endpoint.DELETE_USER, {
      params: { userId: userId },
    });
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Failed to delete product");
    }
    throw e;
  }
};

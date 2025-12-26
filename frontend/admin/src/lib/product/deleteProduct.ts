import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const DeleteProduct = async (productId: number) => {
  try {
    const res = await axiosInstance.delete(
      `${endpoint.FETCH_PRODUCT}/${productId}`,
    );
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

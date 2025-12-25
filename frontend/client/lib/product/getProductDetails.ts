import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const ProductDetails = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`${endpoint.PRODUCT}/${slug}`);
    return res.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

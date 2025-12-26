import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const Product = async () => {
  try {
    const res = await axiosInstance.get(endpoint.PRODUCT, {
      params: { OnlyActive: true, Page: 1, PageSize: 20 },
    });
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

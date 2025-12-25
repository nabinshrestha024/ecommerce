import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const CategoryProduct = async () => {
  try {
    const res = await axiosInstance.get(endpoint.CATEGORY, {
      params: { OnlyActive: true, Page: 1, PageSize: 10 },
    });
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

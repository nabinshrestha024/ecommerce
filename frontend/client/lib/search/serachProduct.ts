import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const searchProduct = async (productName: string) => {
  try {
    const res = await axiosInstance.get(endpoint.PRODUCT, {
      params: { search: productName, OnlyActive: true, Page: 1, PageSize: 20 },
    });
    console.log("search response", res.data);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

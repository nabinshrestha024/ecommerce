import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const ProductByCategory = async (categoryId: number | null) => {
  try {
    const res = await axiosInstance.get(endpoint.PRODUCT, {
      params: {
        CategoryId: categoryId,
        OnlyActive: true,
        Page: 1,
        PageSize: 20,
      },
    });
    return res.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

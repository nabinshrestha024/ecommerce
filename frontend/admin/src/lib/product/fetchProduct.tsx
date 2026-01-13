import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchProduct = async (pageIndex: number, pageSize: number) => {
  try {
    const res = await axiosInstance.get(endpoint.FETCH_PRODUCT, {
      params: {
        OnlyActive: true,
        Page: pageIndex,
        PageSize: pageSize,
      },
    });
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

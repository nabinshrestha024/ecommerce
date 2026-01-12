import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getUser = async (pageIndex: number, pageSize: number) => {
  try {
    const res = await axiosInstance.get(endpoint.USER, {
      params: {
        pageNumber: pageIndex,
        pageSize: pageSize,
      },
    });
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

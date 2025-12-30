import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getUser = async (pageIndex: number) => {
  try {
    const res = await axiosInstance.get(endpoint.USER, {
      params: {
        Page: pageIndex,
        PageSize: 10,
      },
    });
    return res.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

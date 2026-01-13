import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchCategory = async (pageIndex: number, pageSize: number) => {
  try {
    const res = await axiosInstance.get(endpoint.FETCH_CATEGORY, {
      params: {
        IsActive: true,
        Page: pageIndex,
        PageSize: pageSize,
      },
    });

    return res.data.items;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

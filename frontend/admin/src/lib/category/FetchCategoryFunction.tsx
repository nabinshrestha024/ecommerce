import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const Category = async () => {
  try {
    const res = await axiosInstance.get(endpoint.FETCH_CATEGORY, {
      params: {
        IsActive: true,
        Page: 1,
        PageSize: 4,
      },
    });
    return res.data.items;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

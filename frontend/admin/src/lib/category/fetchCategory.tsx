import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchCategory = async () => {
  try {
    const res = await axiosInstance.get(endpoint.FETCH_CATEGORY, {
      params: {
        IsActive: true,
        Page: 1,
        PageSize: 10,
      },
    });

    return res.data.items;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }
};

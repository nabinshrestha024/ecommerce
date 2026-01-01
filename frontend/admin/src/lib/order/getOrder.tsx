import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getOrder = async (pageIndex: number) => {
  const res = await axiosInstance.get(endpoint.FETCH_ORDER, {
    params: { Page: pageIndex, PageSize: 10 },
  });
  return res.data;
};

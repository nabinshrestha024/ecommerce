import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getProduct = async (pageIndex: number, pageSize: number) => {
  const res = await axiosInstance.get(endpoint.FETCH_PRODUCT, {
    params: {
      OnlyActive: true,
      Page: pageIndex,
      PageSize: pageSize,
    },
  });
  return res.data;
};

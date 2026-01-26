import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const sortProduct = async (name: string, pageIndex: number) => {
  const res = await axiosInstance.get(endpoint.FETCH_PRODUCT, {
    params: {
      SortOrder: name,
      OnlyActive: true,
      Page: pageIndex,
      PageSize: 10,
    },
  });
  return res.data;
};

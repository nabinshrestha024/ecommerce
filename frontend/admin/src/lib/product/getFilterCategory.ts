import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const filterProduct = async (name: string, pageIndex: number) => {
  const res = await axiosInstance.get(endpoint.FETCH_PRODUCT, {
    params: {
      CategoryName: name,
      OnlyActive: true,
      Page: pageIndex,
      PageSize: 10,
    },
  });
  return res.data;
};

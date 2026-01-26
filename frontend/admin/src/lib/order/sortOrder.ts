import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const sortOrder = async (name: string, pageIndex: number) => {
  const res = await axiosInstance.get(endpoint.FETCH_ORDER, {
    params: {
      SortOrder: name,
      OnlyActive: true,
      Page: pageIndex,
      PageSize: 10,
    },
  });
  return res.data;
};

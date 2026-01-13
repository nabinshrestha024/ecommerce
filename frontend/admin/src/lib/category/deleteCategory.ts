import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteCategory = async (categoryId: number) => {
  const res = await axiosInstance.delete(
    `${endpoint.FETCH_CATEGORY}/${categoryId}`,
  );
  return res.data;
};

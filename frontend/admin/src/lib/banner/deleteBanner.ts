import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteBanner = async (bannerId: number) => {
  const res = await axiosInstance.delete(
    `${endpoint.FETCH_BANNER}/${bannerId}`,
  );
  return res.data;
};

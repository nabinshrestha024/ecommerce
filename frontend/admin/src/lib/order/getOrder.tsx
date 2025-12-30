import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const getOrder = async () => {
  const res = await axiosInstance.get(endpoint.FETCH_ORDER);
  console.log("order api", res.data);
  return res.data;
};

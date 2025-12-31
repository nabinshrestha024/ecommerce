import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const fetchProfile = async () => {
  const res = await axiosInstance.get(endpoint.FETCHPROFILE);
  return res.data;
};

import { ProfileFormData } from "@/components/Profile/ProfileUpdate";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const editProfile = async (data: ProfileFormData) => {
  const res = await axiosInstance.put(endpoint.FETCHPROFILE, data);
  return res.data;
};

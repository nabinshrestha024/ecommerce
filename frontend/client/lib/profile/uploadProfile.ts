import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const uploadProfile = async (formData: FormData) => {
  const response = await axiosInstance.post(endpoint.CHANGEPROFILE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

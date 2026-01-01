import { endpoint } from "@/lib/endpoint";
import { axiosInstance } from "@/lib/axiosInstance";

export interface ProfileResponse {
  fullName?: string;
  address?: string;
  city?: string;
  bio?: string;
  profileImageFile?: File;
}
export const getProfile = async () => {
  const response = await axiosInstance.get(endpoint.FETCH_PROFILE);
  return response.data;
};
export const updateProfile = async (profileData: ProfileResponse) => {
  const response = await axiosInstance.put(endpoint.FETCH_PROFILE, profileData);
  return response.data;
};

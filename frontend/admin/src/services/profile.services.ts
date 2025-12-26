import { endpoint } from "@/lib/endpoint";
import { axiosInstance } from "@/lib/axiosInstance";
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(endpoint.FETCH_PROFILE);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateProfile = async (profileData: any) => {
  try {
    const response = await axiosInstance.put(
      endpoint.FETCH_PROFILE,
      profileData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

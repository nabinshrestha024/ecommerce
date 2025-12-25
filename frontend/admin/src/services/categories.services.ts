import { axiosInstance } from "../lib/axiosInstance";
import { endpoint } from "../lib/endpoint";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(endpoint.CATEGORIES, {
      params: { IsActive: true },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

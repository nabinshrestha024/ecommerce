import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const getWebsiteReview = async () => {
  try {
    const response = await axiosInstance.get(endpoint.WEBSITEREVIEW);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addWebsiteReview = async ({
  title,
  content,
  rating,
}: {
  title: string;
  content: string;
  rating: number;
}) => {
  return await axiosInstance.post(endpoint.WEBSITEREVIEW, {
    title,
    content,
    rating,
  });
};

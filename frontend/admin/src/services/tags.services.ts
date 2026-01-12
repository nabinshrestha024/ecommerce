import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const editTag = async (
  tagId: number | string,
  tagData: Record<string, unknown>,
) => {
  return await axiosInstance.put(`${endpoint.TAGS}/${tagId}`, tagData);
};

import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const getTags = async () => {
  const response = await axiosInstance.get(endpoint.TAGS);
  return response;
};
export const getCatalogProducts = async (filterData: {
  categoryId?: number;
  tagNames?: string[];
  minPrice?: string;
  maxPrice?: string;
}) => {
  const params = new URLSearchParams();
  if (filterData.categoryId) {
    params.append("categoryId", filterData.categoryId.toString());
  }
  if (filterData.tagNames) {
    filterData.tagNames.forEach((tag) => params.append("tagNames", tag));
  }
  if (filterData.minPrice) {
    params.append("minPrice", filterData.minPrice);
  }
  if (filterData.maxPrice) {
    params.append("maxPrice", filterData.maxPrice);
  }
  const url = `${endpoint.CATALOGPRODUCTS}?${params.toString()}`;

  const response = await axiosInstance.get(url);
  return response;
};

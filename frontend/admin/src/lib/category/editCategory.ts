import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
import type { CategoryData } from "@/hooks/category/useFetchCategory";

export const editCategory = async ({
  categoryId,
  categoryData,
}: {
  categoryId: number;
  categoryData: CategoryData;
}) => {
  const formData = new FormData();

  formData.append("name", categoryData.name);
  formData.append("description", categoryData.description || "");
  formData.append("sortOrder", String(categoryData.sortOrder));
  formData.append("isFeatured", String(categoryData.isFeatured));
  formData.append("isActive", String(categoryData.isActive));

  if (categoryData.categoryImageURL) {
    formData.append("image", categoryData.categoryImageURL);
  }
  const res = await axiosInstance.put(
    `${endpoint.FETCH_CATEGORY}/${categoryId}`,
    formData,
  );

  return res.data;
};

import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export interface ProductTagType {
  tagId: number;
  name: string;
}

export const fetchProductTags = async (id: number) => {
  const res = await axiosInstance.get<ProductTagType[]>(
    `${endpoint.PRODUCTTAGS}/${id}/tags`,
  );
  return res.data;
};

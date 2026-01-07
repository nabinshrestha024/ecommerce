import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addProductTags = async ({
  productId,
  tagId,
}: {
  productId: number;
  tagId: number;
}) => {
  const res = await axiosInstance.post(
    `${endpoint.PRODUCTTAGS}/${productId}/tags/${tagId}`,
  );
  return res.data;
};

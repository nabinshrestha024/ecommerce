import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const removeProductTags = async ({
  productId,
  tagId,
}: {
  productId: number;
  tagId: number;
}) => {
  const res = await axiosInstance.delete(
    `${endpoint.PRODUCTTAGS}/${productId}/tags/${tagId}`,
  );
  return res.data;
};

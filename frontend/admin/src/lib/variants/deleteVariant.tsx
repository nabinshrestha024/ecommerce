import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteVariant = async (productId: number, variantId: number) => {
  const res = await axiosInstance.delete(
    `${endpoint.VARIANT}${productId}/variants/${variantId}`,
  );
  return res.data;
};

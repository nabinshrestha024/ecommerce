import type { Variant } from "@/hooks/variants/useAddVariant";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addVariant = async (productId: number, payload: Variant) => {
  const res = await axiosInstance.post(
    `${endpoint.ADDVARIANT}${productId}/variants`,
    payload,
  );
  return res.data;
};

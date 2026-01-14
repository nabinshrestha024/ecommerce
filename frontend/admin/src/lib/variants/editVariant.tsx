import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
interface Variant {
  variantId: number;
  productId: number;
  stockQuantity: number;
  price: number;
  isDefault: boolean;
  isActive: boolean;
}

export const editVariant = async ({
  variantId,
  productId,
  variantData,
}: {
  variantId: number;
  productId: number;
  variantData: Variant;
}) => {
  const res = await axiosInstance.put(
    `${endpoint.VARIANT}${productId}/variants/${variantId}`,
    variantData,
  );
  return res.data;
};

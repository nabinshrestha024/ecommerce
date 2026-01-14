import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const postProductDiscount = async ({
  productIds,
  discountId,
}: {
  productIds: number[];
  discountId: number;
}) => {
  const res = await axiosInstance.post(
    `${endpoint.DISCOUNT}/${discountId}/products`,
    { productIds },
  );
  return res.data;
};

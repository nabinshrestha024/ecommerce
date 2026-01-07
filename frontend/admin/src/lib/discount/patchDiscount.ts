import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
import type { DiscountData } from "@/hooks/discount/useFetchDiscount";

export const patchDiscount = async ({
  discountId,
  discountData,
  isActive,
}: {
  discountId: number;
  isActive: boolean;
  discountData: DiscountData;
}) => {
  const res = await axiosInstance.patch(
    `${endpoint.DISCOUNT}/status`,
    discountData,
    { params: { discountId: discountId, isActive: isActive } },
  );
  return res.data;
};

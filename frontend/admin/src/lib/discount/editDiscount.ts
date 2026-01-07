import axios from "axios";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
import type { DiscountData } from "@/hooks/discount/useFetchDiscount";

export const editDiscount = async ({
  discountId,
  discountData,
}: {
  discountId: number;
  discountData: DiscountData;
}) => {
  try {
    const res = await axiosInstance.put(
      `${endpoint.DISCOUNT}/update`,
      discountData,
      { params: { discountId: discountId } },
    );
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    }
  }
};

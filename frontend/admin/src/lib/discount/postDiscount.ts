import type { DiscountAddFormValues } from "@/components/Discount/AddDiscountZodValidation";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const postDiscount = async (data: DiscountAddFormValues) => {
  const res = await axiosInstance.post(endpoint.DISCOUNT, data);
  return res.data;
};

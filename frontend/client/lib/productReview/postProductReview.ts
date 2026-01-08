import { ReviewFormValues } from "@/components/Review/components/ReviewForm.zod";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

type ReviewProps = {
  productId: number;
  data: ReviewFormValues;
};
export const postProductReview = async ({ productId, data }: ReviewProps) => {
  const res = await axiosInstance.post(`${endpoint.REVIEW}`, data, {
    params: { productId: productId },
  });
  return res.data;
};

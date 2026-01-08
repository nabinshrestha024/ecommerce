import { fetchProductReview } from "@/lib/productReview/fetchProductReview";
import { useQuery } from "@tanstack/react-query";
export type ProductReview = {
  reviewId: number;
  userId: number;
  userName: string;
  userImageUrl: string;
  content: string;
  rating: number;
  createdAt: string;
};

export const useFetchReview = (productId: number) => {
  const { data, isLoading, isError, error } = useQuery<ProductReview[]>({
    queryKey: ["reviewData"],
    queryFn: () => fetchProductReview(productId),
  });
  return { data, isLoading, isError, error };
};

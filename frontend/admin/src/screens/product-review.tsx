import { ProductReviewHeader } from "@/components/ProductReviews/ProductReviewHeader";
import { ProductReviews } from "@/components/ProductReviews/ProductReviews";

export const ProductReview = () => {
  return (
    <div className=" p-5 flex flex-col gap-5 w-full">
      <ProductReviewHeader />
      <ProductReviews />
    </div>
  );
};

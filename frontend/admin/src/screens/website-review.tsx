import { WebsiteReviewHeader } from "@/components/WebsiteReviews/WebsiteReviewHeader";
import { WebsiteReviews } from "@/components/WebsiteReviews/WebsiteReviews";

export const WebsiteReview = () => {
  return (
    <div className=" p-5 flex flex-col gap-5 w-full">
      <WebsiteReviewHeader />
      <WebsiteReviews />
    </div>
  );
};

import { useFetchReview } from "@/hooks/productReview/useFetchProductReview";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/Card/Card";
import { useState } from "react";
import { MdInventory } from "react-icons/md";
interface ReviewProps {
  productId: number;
}

export const ProductReview = ({ productId }: ReviewProps) => {
  const fetchProductReview = useFetchReview(productId);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card className="flex flex-col gap-4 p-2">
      <div className="font-bold text-lg sm:text-xl p-2">Product Review</div>
      {!fetchProductReview.data || fetchProductReview.data.length === 0 ? (
        <div className="text-gray-600 text-sm mb-4 flex flex-col items-center">
          <MdInventory />
          <p className="font-medium">This product has no reviews.</p>
          <p className="text-center">
            Let others know what do you think and be the first to write a
            review.
          </p>
        </div>
      ) : (
        <div>
          {fetchProductReview.data?.map((reviewData, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-2 p-4 border-b border-t-gray-500"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-5">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Image
                      src={reviewData.userImageUrl}
                      alt={reviewData.userName}
                      fill
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < reviewData.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <div className="text-[14px] text-gray-400">
                      {reviewData.userName}
                    </div>
                  </div>
                </div>
                <div className="text-[12px]">
                  {reviewData.createdAt.split("T")[0]}
                </div>
              </div>
              <div
                className={`text-[16px] font-medium line-clamp-4 ${openIndex === index ? "line-clamp-none" : "line-clamp-4"}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {reviewData.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

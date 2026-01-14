import {
  ReviewFormSchema,
  ReviewFormValues,
} from "@/components/Review/components/ReviewForm.zod";
import { StarInput } from "@/components/Review/components/StarInput";
import { TextArea } from "@/components/TextArea/TextArea";
import { usePostProductReview } from "@/hooks/productReview/usePostProductReview";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
interface ReviewFormProps {
  productId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const ProductReviewForm = ({ productId, setOpen }: ReviewFormProps) => {
  const productReview = usePostProductReview();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema) as Resolver<ReviewFormValues>,
    mode: "onChange",
  });

  const onSubmit = (data: ReviewFormValues) => {
    productReview.mutate(
      {
        productId,
        data,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <div className="w-full  mx-auto bg-white p-6 grid grid-cols-2 gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add a review
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex gap-8 ">
            <Label className="text-[16px] font-semibold">Rating</Label>
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <StarInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <div className="flex gap-4 ">
            <Label className="text-[16px] font-semibold">Message</Label>
            <div className="">
              <TextArea
                {...register("content")}
                maxLength={250}
                placeholder="Write a review..."
                className="w-[250px] text-sm text-gray-800 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                       resize-none  transition duration-150 mb-0"
              />
              {errors.content && (
                <p className="text-xs text-red-500">{errors.content.message}</p>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-600 text-white font-medium
                       py-2 px-5 rounded-lg transition-colors duration-200 text-sm"
        >
          POST
        </Button>
      </form>
    </div>
  );
};

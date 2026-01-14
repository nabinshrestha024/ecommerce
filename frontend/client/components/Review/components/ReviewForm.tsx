import { Controller, useForm } from "react-hook-form";
import { StarInput } from "./StarInput";
import { Button } from "@/ui/button";
import { useAddWebsiteReview } from "@/hooks/websiteReview/useAddWebsiteReview";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormSchema, type ReviewFormValues } from "./ReviewForm.zod";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
interface onCloseProps {
  onClose: () => void;
}

export const ReviewForm = ({ onClose }: onCloseProps) => {
  const { mutate } = useAddWebsiteReview();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
    mode: "onChange",
    defaultValues: {
      rating: 0,
    },
  });
  const handleReviewSubmit = (data: ReviewFormValues) => {
    const payload = {
      title: "",
      rating: data.rating,
      content: data.content,
    };
    mutate(payload, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <div className="w-full  mx-auto bg-white p-6 grid grid-cols-2 gap-5">
      <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">
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
              <Textarea
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

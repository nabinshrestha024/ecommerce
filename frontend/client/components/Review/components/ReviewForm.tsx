import { Controller, useForm } from "react-hook-form";
import { StarInput } from "./StarInput";
import { Input } from "@/components/Input/Input";
import { Button } from "@/ui/button";
import { useAddWebsiteReview } from "@/hooks/websiteReview/useAddWebsiteReview";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormSchema, type ReviewFormValues } from "./ReviewForm.zod";
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
    console.log(data);
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>
      <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">
        <div className="flex flex-col justify-start mt-2">
          <Controller
            name="rating"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <StarInput value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>
        <div>
          <textarea
            className="h-20 w-full px-2"
            {...register("content")}
            placeholder="Share your experience..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

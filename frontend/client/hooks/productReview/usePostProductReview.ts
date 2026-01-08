"use client";

import { postProductReview } from "@/lib/productReview/postProductReview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostProductReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProductReview"],
    mutationFn: postProductReview,

    onSuccess: () => {
      toast.success("Review added");
      queryClient.invalidateQueries({ queryKey: ["reviewData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

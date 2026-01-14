"use client";

import { postProductDiscount } from "@/lib/discount/postProductDiscount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostProductDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addDiscount"],
    mutationFn: postProductDiscount,

    onSuccess: () => {
      toast.success("Discount added");
      queryClient.invalidateQueries({ queryKey: ["discountData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

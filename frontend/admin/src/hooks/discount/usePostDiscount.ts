"use client";

import { postDiscount } from "@/lib/discount/postDiscount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addDiscount"],
    mutationFn: postDiscount,

    onSuccess: () => {
      toast.success("Discount added");
      queryClient.invalidateQueries({ queryKey: ["DiscountData"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

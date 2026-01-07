"use client";

import { editDiscount } from "@/lib/discount/editDiscount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditDicount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDiscount"],
    mutationFn: editDiscount,

    onSuccess: () => {
      toast.success("Discount updated successfully");
      queryClient.invalidateQueries({ queryKey: ["discountData"] });
    },

    onError: () => {
      toast.error("Failed to update discount");
    },
  });
};

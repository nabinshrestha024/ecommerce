"use client";

import { patchDiscount } from "@/lib/discount/patchDiscount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePatchDicount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateDiscount"],
    mutationFn: patchDiscount,

    onSuccess: () => {
      toast.success("Discount updated successfully");
      queryClient.invalidateQueries({ queryKey: ["discountData"] });
    },

    onError: () => {
      toast.error("Failed to update discount");
    },
  });
};

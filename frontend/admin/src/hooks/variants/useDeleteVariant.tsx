"use client";

import type { Variant } from "@/components/ProductVariant/CategoryDetails";
import { deleteVariant } from "@/lib/variants/deleteVariant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteVariant"],
    mutationFn: ({ productId, variantId }: Variant) =>
      deleteVariant(productId, variantId),

    onSuccess: () => {
      toast.success("Deleted variant successfully! ");
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

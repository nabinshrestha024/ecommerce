"use client";

import { editProduct } from "@/lib/product/editProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: editProduct,

    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },

    onError: () => {
      toast.error("Failed to update product");
    },
  });
};

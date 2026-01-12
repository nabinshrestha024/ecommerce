"use client";

import { DeleteProduct } from "@/lib/product/deleteProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// type ProductData = {
//   productId: number;
//   name: string;
//   slug: string;
//   shortDescription: string | null;
//   price: number;
//   stockQuantity: number;
//   primaryImageUrl: string;
//   isActive: boolean;
//   categoryId: number;
//   sku: string;
// };

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: DeleteProduct,

    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["productData"] });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

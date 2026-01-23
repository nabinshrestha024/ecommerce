import { postProduct } from "@/services/product.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productData"] });
      toast.success("Product created successfully");
    },
    onError: () => {
      toast.error("Product creation failed");
    },
  });
};

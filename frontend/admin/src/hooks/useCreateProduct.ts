import { postProduct } from "@/services/product.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["createProduct"],
    mutationFn: postProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Product creation failed");
    },
  });
};

import { addVariant } from "@/lib/variants/addVariant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Variant {
  price: number;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  attributeValueIds: number[];
}

export const useAddVariant = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addVariant", productId],
    mutationFn: (variant: Variant) => addVariant(productId, variant),

    onSuccess: () => {
      toast.success("Variant added");
      queryClient.invalidateQueries({
        queryKey: ["productDataById"],
      });
      queryClient.invalidateQueries({
        queryKey: ["productData"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

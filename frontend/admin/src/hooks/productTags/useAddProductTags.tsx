import { addProductTags } from "@/lib/productTags/addProductTags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddProductTags = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["addProductTags"],
    mutationFn: addProductTags,
    onSuccess: () => {
      toast.success("Product Tag added successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchProductTags"] });
    },
    onError: () => {
      toast.error("Failed to add product tag");
    },
  });
  return data;
};

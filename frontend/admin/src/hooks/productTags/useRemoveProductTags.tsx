import { removeProductTags } from "@/lib/productTags/removeProductTags";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveProductTags = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["removeProductTags"],
    mutationFn: removeProductTags,
    onSuccess: () => {
      toast.success("Tag removed successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchProductTags"] });
    },
    onError: () => {
      toast.error("Failed to delete tag");
    },
  });
  return data;
};

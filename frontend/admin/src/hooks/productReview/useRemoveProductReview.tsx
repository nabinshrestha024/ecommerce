import { removeProductReview } from "@/lib/productReview/removeProductReview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveProductReview = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["removeProductReview"],
    mutationFn: removeProductReview,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["fetchProductReview"] });
    },
    onError: (data) => {
      toast.error(data.message || "An error occured");
    },
  });
  return data;
};

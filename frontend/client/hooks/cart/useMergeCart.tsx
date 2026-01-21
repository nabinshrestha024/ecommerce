import { mergeCart } from "@/lib/cart/mergeCart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMergeCart = () => {
  const data = useMutation({
    mutationKey: ["mergeCart"],
    mutationFn: mergeCart,
    onSuccess: () => {
      // toast.success("Cart merged successfully");
    },
    onError: () => {
      toast.error("Failed to merge cart");
    },
  });
  return data;
};

import { addToCart } from "@/lib/cart/addToCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
      toast.success("Item added to cart successfully");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};

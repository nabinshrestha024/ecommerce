import { deleteCart } from "@/lib/cart/deleteCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
      toast.success("Item deleted from cart");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};

import { updateCart } from "@/lib/cart/updateCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["updateCart"],
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchCart"] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};

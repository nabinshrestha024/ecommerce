import { addOrder } from "@/lib/orders/addOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationKey: ["addOrder"],
    mutationFn: addOrder,
    onSuccess: () => {
      toast.success("Order created successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchNotification"] });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};

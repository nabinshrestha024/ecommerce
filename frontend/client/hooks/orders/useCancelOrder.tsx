import { cancelOrder } from "@/lib/orders/cancelOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCancelOrder = (orderId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cancelOrder"],
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["orderData"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Order cancellation failed");
    },
  });
};

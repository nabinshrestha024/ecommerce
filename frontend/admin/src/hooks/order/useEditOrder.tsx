"use client";

import { editOrder } from "@/lib/order/editOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: editOrder,

    onSuccess: () => {
      toast.success("Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["OrderData"] });
    },

    onError: () => {
      toast.error("Failed to update order");
    },
  });
};

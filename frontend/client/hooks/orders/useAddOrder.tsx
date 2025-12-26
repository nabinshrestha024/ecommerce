import { addOrder } from "@/lib/orders/addOrder";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddOrder = () => {
  const data = useMutation({
    mutationKey: ["addOrder"],
    mutationFn: addOrder,
    onSuccess: () => {
      toast.success("Order created successfully");
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return data;
};

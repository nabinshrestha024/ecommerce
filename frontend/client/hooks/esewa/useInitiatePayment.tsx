import { initiatePayment } from "@/lib/esewa/initiatePayment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInitiatePayment = () => {
  const data = useMutation({
    mutationKey: ["initiatePayment"],
    mutationFn: initiatePayment,
    onError: () => {
      toast.error("Payment Failed");
    },
  });
  return data;
};

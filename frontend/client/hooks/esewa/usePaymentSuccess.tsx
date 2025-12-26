import { paymentSuccess } from "@/lib/esewa/paymentSuccess";
import { useQuery } from "@tanstack/react-query";

export const usePaymentSuccess = (paymentData: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["successPayment"],
    queryFn: () => paymentSuccess(paymentData),
  });
  return { data, isLoading, isError, error };
};

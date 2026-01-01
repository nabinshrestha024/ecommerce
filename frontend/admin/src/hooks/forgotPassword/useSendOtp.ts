import { verifyOTP } from "@/services/forgotPassword.services";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: verifyOTP,
    onSuccess: () => {
      toast.success("OTP verified successfully");
    },
    onError: () => {
      toast.error("Failed to verify OTP");
    },
  });
};

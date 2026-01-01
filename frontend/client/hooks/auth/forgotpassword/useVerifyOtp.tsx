"use client";

import { verifyOtp } from "@/lib/auth/forgotpassword/verifyOtp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useVerifyOtp() {
  return useMutation({
    mutationKey: ["verifyotp"],
    mutationFn: verifyOtp,

    onSuccess: (data) => {
      if (data) {
        toast.success("OTP verified successfully!");
      } else {
        toast.error("Unsuccessful to verify OTP!");
      }
    },

    onError: () => {
      toast.error("An error occurred during verifying OTP.");
    },
  });
}

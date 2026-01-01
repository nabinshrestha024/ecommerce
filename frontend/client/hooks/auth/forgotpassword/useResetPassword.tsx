"use client";

import { resetPassword } from "@/lib/auth/forgotpassword/resetPassword";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useResetPassword() {
  return useMutation({
    mutationKey: ["resetpassword"],
    mutationFn: resetPassword,

    onSuccess: (data) => {
      if (data) {
        toast.success("Password reset successfully!");
      } else {
        toast.error("Unsuccessful to reset password!");
      }
    },

    onError: () => {
      toast.error("An error occurred during resetting password.");
    },
  });
}

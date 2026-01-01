import { resetPassword } from "@/services/forgotPassword.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSendPassword = () => {
  return useMutation({
    mutationKey: ["sendPassword"],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully");
    },
    onError: () => {
      toast.error("Failed to reset password");
    },
  });
};

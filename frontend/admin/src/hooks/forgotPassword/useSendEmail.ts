import { sendEmailForPasswordReset } from "@/services/forgotPassword.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["sendEmail"],
    mutationFn: sendEmailForPasswordReset,
    onSuccess: () => {
      toast.success("Email sent for password reset");
    },
    onError: () => {
      toast.error("Failed to send email for password reset");
    },
  });
};

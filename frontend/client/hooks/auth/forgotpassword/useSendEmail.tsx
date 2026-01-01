"use client";

import { sendEmail } from "@/lib/auth/forgotpassword/sendEmail";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSendEmail() {
  return useMutation({
    mutationKey: ["sendemail"],
    mutationFn: sendEmail,

    onSuccess: (data) => {
      if (data) {
        toast.success("Email sent successfully!");
      } else {
        toast.error("Unsuccessful to send email!");
      }
    },

    onError: () => {
      toast.error("Please make sure the email you've entered is registered..");
    },
  });
}

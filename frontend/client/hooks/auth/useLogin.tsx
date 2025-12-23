"use client";

import { loginFn } from "@/lib/auth/LoginFn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,

    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        if (typeof window !== "undefined") {
          localStorage.setItem("user", data.token);
        }
      } else {
        toast.error(data.message);
      }
    },
  });
}

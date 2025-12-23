"use client";

import { loginFn } from "@/lib/auth/LoginFn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,

    onSuccess: (data) => {
      if (data) {
        toast.success("Login successful!");
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }
      } else {
        toast.error("Login failed!");
      }
    },

    onError: () => {
      toast.error("An error occurred during login.");
    },
  });
}

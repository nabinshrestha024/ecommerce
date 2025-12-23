"use client";

import { useAuth } from "@/contexts/AuthContext";
import { loginFn } from "@/lib/auth/LoginFn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogin() {
  const { setToken } = useAuth();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,

    onSuccess: (data) => {
      if (data) {
        toast.success("Login successful!");
        setToken(data.token);
      } else {
        toast.error("Login failed!");
      }
    },

    onError: () => {
      toast.error("An error occurred during login.");
    },
  });
}

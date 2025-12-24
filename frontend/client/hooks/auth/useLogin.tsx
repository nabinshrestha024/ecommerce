"use client";

import { useAuth } from "@/contexts/AuthContext";
import { loginFn } from "@/lib/auth/loginFunction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const { setToken } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,

    onSuccess: (data) => {
      if (data) {
        toast.success("Login successful!");
        router.push("/home");
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

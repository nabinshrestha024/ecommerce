"use client";

import { registerFn } from "@/lib/auth/registerFunction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,

    onSuccess: (data) => {
      if (data) {
        toast.success("Register successful!");
        if (typeof window !== "undefined") {
          localStorage.setItem("registerToken", data.token);
        }
      } else {
        toast.error("Register failed!");
      }
    },

    onError: () => {
      toast.error("An error occurred during register.");
    },
  });
}

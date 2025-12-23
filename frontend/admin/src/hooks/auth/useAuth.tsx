"use client";
import { LoginFunction } from "@/lib/auth/LoginFunction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: LoginFunction,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid login response");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Login failed");
    },
  });
};

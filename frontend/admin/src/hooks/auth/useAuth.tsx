"use client";
import { LoginFunction } from "@/lib/auth/LoginFunction";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: LoginFunction,
    onSuccess: (data) => {
      login(data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Login failed");
    },
  });
};

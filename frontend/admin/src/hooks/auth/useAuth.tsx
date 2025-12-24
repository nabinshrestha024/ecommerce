"use client";
import { LoginFunction } from "@/lib/auth/loginFn";
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
      if (data.token) {
        login(data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid login response");
      }
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
};

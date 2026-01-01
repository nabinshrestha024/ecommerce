"use client";

import { Label } from "@/ui/label";
import { LoginFormSchema, type LoginFormType } from "./AdminLoginForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { useLogin } from "@/hooks/auth/useAuth";
import { Input } from "../Input/Input";
import { Dialog } from "../Dialog/Dialog";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import { useState } from "react";

export const AdminLoginForm = () => {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });
  const [open, setOpen] = useState(false);
  const onSubmit = (data: LoginFormType) => {
    reset();
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 flex flex-col gap-2"
    >
      <div className="text-3xl font-semibold mb-5">Login</div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Enter your email"
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
      <div>
        <Button type="submit" className="mt-5 w-full" value={"Login"}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        triggerContent={
          <button className="text-sm underline" onClick={() => setOpen(true)}>
            Forgot Password?
          </button>
        }
      >
        <ForgotPassword onClose={() => setOpen(false)} />
      </Dialog>
    </form>
  );
};

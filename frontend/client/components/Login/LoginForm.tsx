"use client";

import { Label } from "@/ui/label";
import { LoginFormSchema, LoginFormSchemaType } from "./loginForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { Input } from "../Input/Input";
import { Dialog } from "../dialog/Dialog";
import { ForgetPasswordDialogContent } from "../ForgetPassword/ForgetPasswordDialogContent";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormSchemaType) => {
    reset();
    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };
  const [open, setOpen] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 flex flex-col gap-3"
    >
      <div className="text-4xl font-bold mb-5">Login</div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className={`${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
            autoComplete="off"
          />
        </div>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        triggerText={
          <div className="text-green-600 text-[16px] flex justify-end underline cursor-pointer">
            Forgot password?
          </div>
        }
      >
        <ForgetPasswordDialogContent setOpen={setOpen} />
      </Dialog>
      <Button type="submit" className="w-full mt-2" value={"Login"}>
        Login
      </Button>
      <div>
        Don&apos;t have an account?{" "}
        <Link
          href={"/signup"}
          className="text-green-600 text-[16px] underline cursor-pointer"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

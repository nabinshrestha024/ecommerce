"use client";

import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { LoginFormSchema, LoginFormSchemaType } from "./loginForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";

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
    console.log(data);
    reset();
    mutate(data);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 flex flex-col gap-2"
    >
      <div className="text-3xl font-semibold mb-5">Login</div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="Enter your username"
        />
        <p className="text-red-500">{errors.username?.message}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
      <div>
        <Button type="submit" className="mt-5 w-full" value={"Login"}>
          Login
        </Button>
      </div>
      <div className="mt-5 text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={"/signup"}
          className="text-blue-500 underline cursor-pointer"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

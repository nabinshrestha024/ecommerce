"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormSchema, RegisterFormSchemaType } from "./registerForm.zod";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useRegister } from "@/hooks/auth/useRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type RegisterPayload = Omit<RegisterFormSchemaType, "repassword">;

export const RegisterForm = ({}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onBlur",
    defaultValues: {
      gender: "",
    },
  });
  const router = useRouter();

  const { mutate } = useRegister();

  const onSubmit = (data: RegisterFormSchemaType) => {
    const { repassword, ...payload } = data;
    mutate(payload as RegisterPayload, {
      onSuccess: () => {
        router.push("/login");
      },
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 flex flex-col gap-2"
    >
      <div className="text-3xl font-semibold mb-5">Register</div>
      <div className="flex flex-col gap-6 px-2 max-h-[300px] overflow-scroll overflow-x-hidden">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="Enter your full name"
            className={`${errors.fullName ? "border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="m@example.com"
            className={` ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            type="text"
            inputMode="numeric"
            maxLength={10}
            pattern="[0-9]{10}"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            })}
            placeholder="Enter your phone number"
            className={`no-spinner ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className={`${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rePassword">Re-Password</Label>
          <Input
            id="rePassword"
            {...register("repassword")}
            type="password"
            placeholder="Enter your password again"
            className={`${errors.repassword ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Date of Birth</Label>
          <Input
            id="city"
            {...register("dateOfBirth")}
            type="date"
            placeholder="Enter your date of birth"
            className={`${errors.dateOfBirth ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">Gender</Label>
          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <Input
                type="radio"
                {...register("gender")}
                value={"Male"}
                className={`w-4 h-4 ${errors.gender ? "border-red-500 focus:border-red-500" : ""}`}
              />
              <div>Male</div>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="radio"
                value={"Female"}
                {...register("gender")}
                className={`w-4 h-4 ${errors.gender ? "border-red-500 focus:border-red-500" : ""}`}
              />
              <div>Female</div>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address")}
            type="text"
            placeholder="Enter your address"
            className={`${errors.address ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register("city")}
            type="text"
            placeholder="Enter your city"
            className={`${errors.city ? "border-red-500 focus:border-red-500" : ""}`}
          />
        </div>
      </div>
      <div>
        <Button type="submit" className="mt-5 w-full" value={"Register"}>
          Register
        </Button>
      </div>
      <div className="text-center text-[12px]">
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-500 underline">
          Login
        </Link>
      </div>
    </form>
  );
};

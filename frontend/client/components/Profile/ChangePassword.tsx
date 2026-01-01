"use client";

import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "./schemas/Password.zod";
import { Card } from "../Card/Card";
import { useChangePassword } from "@/hooks/profile/useChangePassword";
import { Input } from "../Input/Input";
export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(PasswordSchema), mode: "all" });

  const changePassword = useChangePassword();

  const onSubmit = (data: { currentPassword: string; newPassword: string }) => {
    changePassword.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    reset();
  };
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full py-4 px-4 sm:py-6 sm:px-6 rounded-xl"
      rootClassName="p-0 border-none shadow-none rounded-xl"
    >
      <div>
        <div className="font-bold text-lg sm:text-[22px] leading-tight sm:leading-[26px] tracking-[0%]">
          Change Password
        </div>
        <form
          className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base mb-2">
              Current Password
            </label>
            <Input
              type="password"
              {...register("currentPassword")}
              className="w-full"
              placeholder="Current password..."
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base mb-2">New Password</label>
            <Input
              type="password"
              {...register("newPassword")}
              className="w-full"
              placeholder="New password..."
            />
            {errors.newPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              {...register("confirmPassword")}
              className="w-full"
              placeholder="Confirm password..."
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          <Button
            className="mt-3 sm:mt-4 h-10 w-full text-sm sm:text-base"
            variant={"default"}
            type="submit"
          >
            Update Password
          </Button>
        </form>
      </div>
    </Card>
  );
};

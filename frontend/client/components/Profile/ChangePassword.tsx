"use client";

import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "./schemas/Password.zod";
import { Card } from "../Card/Card";
import { useChangePassword } from "@/hooks/profile/useChangePassword";
import { Input } from "../Input/Input";
import { useState } from "react";
import { SquarePen } from "lucide-react";
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
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Card
      className="p-5 shadow-none rounded-none border-0 justify-between items-start relative border-b-2 border-b-gray-100 "
      rootClassName="p-0 border-none shadow-none rounded-none overflow-hidden"
    >
      <div>
        <div className="flex w-full justify-between ">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 mb-5">
            Change your password
          </h3>
          <button
            className={`rounded-xl transition-all duration-200 ${
              isEditing
                ? "bg-white text-[#4EA674] shadow-md hover:shadow-lg"
                : " text-white"
            }`}
            onClick={handleEditToggle}
            aria-label={isEditing ? "Cancel editing" : "Edit profile"}
          >
            <SquarePen className="h-5 w-5" color="black" />
          </button>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col ">
              <label className="text-md font-medium text-gray-700">
                Current Password
              </label>
              <Input
                type="password"
                disabled={!isEditing}
                {...register("currentPassword")}
                className="w-full mt-2"
                placeholder="Current password..."
              />
              {errors.currentPassword && (
                <div className="text-sm text-red-600 ">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>
            <div className="flex flex-col ">
              <label className="text-md font-medium text-gray-700">
                New Password
              </label>
              <Input
                type="password"
                disabled={!isEditing}
                {...register("newPassword")}
                className="w-full mt-2"
                placeholder="New password..."
              />
              {errors.newPassword && (
                <p className="text-sm text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-col ">
              <label className="text-md font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                type="password"
                disabled={!isEditing}
                {...register("confirmPassword")}
                className="w-full mt-2"
                placeholder="Confirm password..."
              />
              {errors.confirmPassword && (
                <div className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <Button
              className="h-10 w-full text-sm"
              variant={"default"}
              type="submit"
            >
              Update Password
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
};

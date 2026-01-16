import { Button } from "@/ui/button";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePassword } from "@/hooks/changePassword/useChangePassword";
import { PasswordSchema } from "./schemas/Password.zod";
import { SquarePen } from "lucide-react";
import { useState } from "react";
export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(PasswordSchema), mode: "onChange" });

  const changePassword = useChangePassword();

  const onSubmit = (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    changePassword.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  return (
    <Card
      className="p-5 shadow-none rounded-none border-0 justify-between items-start relative border-b-2 border-b-gray-100 "
      cardClassName="p-0 border-none shadow-none rounded-none overflow-hidden"
    >
      <div>
        <div className="flex w-full justify-between">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            Change your password
          </h3>
          <button
            className={`rounded-xl transition-all duration-200 absolute top-2 right-3 ${
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
        <form
          className="mt-4 sm:mt-5 grid grid-cols-2 gap-3 sm:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {isEditing && (
            <Button
              className="mt-3 sm:mt-4 h-10 w-full text-sm"
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

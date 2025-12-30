import { Button } from "@/ui/button";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePassword } from "@/hooks/changePassword/useChangePassword";
import { PasswordSchema } from "./schemas/Password.zod";
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
  return (
    <Card
      className="flex flex-col shadow-[0px_1px_3px_0px_#00000033] w-full py-4 px-4 sm:py-6 sm:px-6 rounded-xl"
      cardClassName="p-0 border-none shadow-none rounded-xl"
    >
      <div>
        <div className="font-bold text-lg sm:text-[22px] leading-tight sm:leading-[26px] tracking-[0%]">
          Change Password
        </div>
        <form
          className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col ">
            <label className="text-sm sm:text-base">Current Password</label>
            <Input
              type="password"
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
            <label className="text-sm sm:text-base">New Password</label>
            <Input
              type="password"
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
            <label className="text-sm sm:text-base">Confirm Password</label>
            <Input
              type="password"
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

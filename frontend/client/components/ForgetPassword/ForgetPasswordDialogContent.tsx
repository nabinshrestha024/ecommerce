import { Button } from "@/ui/button";
import { Input } from "../Input/Input";
import { Dispatch, SetStateAction, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/input-otp";
import { useSendEmail } from "@/hooks/auth/forgotpassword/useSendEmail";
import { useVerifyOtp } from "@/hooks/auth/forgotpassword/useVerifyOtp";
import { useResetPassword } from "@/hooks/auth/forgotpassword/useResetPassword";
import {
  NewPasswordFormSchema,
  NewPasswordFormSchemaType,
} from "./NewPasswordForm.zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/ui/label";

export type NewPasswordPayload = Omit<NewPasswordFormSchemaType, "repassword">;

export const ForgetPasswordDialogContent = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPasswordFormSchemaType>({
    resolver: zodResolver(NewPasswordFormSchema),
    mode: "onBlur",
  });
  const [render, setRender] = useState(2);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const sendEmail = useSendEmail();
  const verifyOtp = useVerifyOtp();
  const resetPassword = useResetPassword();

  const handleSendEmail = (email: string) => {
    sendEmail.mutate(
      { email },
      {
        onSuccess: () => {
          setRender(2);
        },
      },
    );
  };

  const handleVerifyOtp = (email: string, otp: string) => {
    verifyOtp.mutate(
      { email, otp },
      {
        onSuccess: () => {
          setRender(3);
        },
      },
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (
    data: NewPasswordFormSchemaType,
    email: string,
    otp: string,
  ) => {
    const { repassword, ...payload } = data;
    resetPassword.mutate(
      { ...(payload as NewPasswordPayload), email, otp },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
    reset();
  };

  return render === 1 ? (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="text-3xl font-bold">Forgot Password ?</div>
        <div className="space-y-2">
          <div>Please enter your email below :</div>
          <Input
            type="email"
            placeholder="yourexample@gmail.com"
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        type="button"
        className="mt-5 w-full"
        onClick={() => handleSendEmail(email)}
      >
        Submit
      </Button>
    </div>
  ) : render === 2 ? (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="text-3xl font-bold">Verify OTP</div>
        <div className="space-y-2">
          <div>Enter your one-time password :</div>
          <div className="flex items-center justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
              containerClassName="gap-3"
            >
              <InputOTPGroup className="gap-3">
                <InputOTPSlot className="h-12 w-12 text-xl" index={0} />
                <InputOTPSlot className="h-12 w-12 text-xl" index={1} />
                <InputOTPSlot className="h-12 w-12 text-xl" index={2} />
                <InputOTPSlot className="h-12 w-12 text-xl" index={3} />
                <InputOTPSlot className="h-12 w-12 text-xl" index={4} />
                <InputOTPSlot className="h-12 w-12 text-xl" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </div>
      <Button
        type="button"
        className="mt-5 w-full"
        onClick={() => handleVerifyOtp(email, value)}
      >
        Submit
      </Button>
    </div>
  ) : (
    render === 3 && (
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, email, value))}
        className="py-6 flex flex-col gap-2"
      >
        <div className="text-3xl font-semibold mb-5">Enter new password</div>
        <div className="flex flex-col gap-6 px-2">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="newPassword"
              {...register("newPassword")}
              type="password"
              placeholder="Enter your new password"
            />
            <p className="text-red-500">{errors.newPassword?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rePassword">Re-Password</Label>
            <Input
              id="rePassword"
              {...register("repassword")}
              type="password"
              placeholder="Enter your password again"
            />
            <p className="text-red-500">{errors.repassword?.message}</p>
          </div>
          <div>
            <Button
              type="submit"
              className="mt-5 w-full"
              value={"New Password"}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    )
  );
};

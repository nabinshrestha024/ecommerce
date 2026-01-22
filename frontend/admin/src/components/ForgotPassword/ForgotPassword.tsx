import { useState } from "react";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import {
  PasswordSchema,
  EmailSchema,
  OTPSchema,
  type OTPType,
  type EmailType,
  type PasswordType,
} from "./ForgotPassword.zod";
import { Button } from "@/ui/button";
import { useSendEmail } from "@/hooks/forgotPassword/useSendEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtp } from "@/hooks/forgotPassword/useSendOtp";
import { useSendPassword } from "@/hooks/forgotPassword/useSendPassword";
import { InputOTPField } from "../Otp/InputOTPField";

type step = "Email" | "OTP" | "ResetPassword";
interface onCloseProps {
  onClose: () => void;
}

export const ForgotPassword = ({ onClose }: onCloseProps) => {
  const sendEmail = useSendEmail();
  const sendOtp = useSendOtp();
  const sendNewPassword = useSendPassword();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<step>("Email");
  const emailForm = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
    mode: "onChange",
  });
  const OtpForm = useForm<OTPType>({
    resolver: zodResolver(OTPSchema),
    mode: "onChange",
  });
  const PasswordForm = useForm<PasswordType>({
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
  });

  const handleEmailSubmit = (data: EmailType) => {
    sendEmail.mutate(data, {
      onSuccess: () => {
        setEmail(data.email);
        setStep("OTP");
      },
    });
  };
  const handleOtpSubmit = (data: OTPType) => {
    sendOtp.mutate(
      { email, otp: data.otp },
      {
        onSuccess: () => {
          setOtp(data.otp);
          setStep("ResetPassword");
        },
      },
    );
  };
  const handlePasswordSubmit = (data: PasswordType) => {
    sendNewPassword.mutate(
      { email, otp, newPassword: data.newPassword },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="max-h-[70vh] h-full overflow-y-auto overflow-x-hidden">
      {step === "Email" && (
        <form
          className="space-y-4"
          onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-5">
            Forgot Password
          </h2>
          <div className="space-y-2">
            <label>Please enter your email below :</label>
            <Input
              type="text"
              {...emailForm.register("email")}
              placeholder="your@email.com"
              className={`mt-2 ${emailForm.formState.errors.email ? "border-red-500" : ""}`}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-7"
            disabled={sendEmail.isPending}
          >
            {sendEmail.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}

      {step === "OTP" && (
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            OtpForm.setValue("otp", otp, {
              shouldValidate: true,
              shouldDirty: true,
            });
            OtpForm.handleSubmit(handleOtpSubmit)();
          }}
        >
          <div className="space-y-5">
            <div className="text-3xl font-bold">Verify OTP</div>

            <div className="space-y-2">
              <div>Enter your one-time password</div>
              <div className="flex items-center justify-center">
                <InputOTPField
                  length={6}
                  value={otp}
                  onChange={(value: string) => setOtp(value)}
                  className="flex justify-center items-center gap-2 sm:gap-3 "
                  slotClassName="w-10 h-10 sm:w-12 sm:h-12 text-xl font-semibold border border-gray-400 rounded-md focus:border-blue-500 transition shrink-0"
                />
              </div>

              {OtpForm.formState.errors.otp && (
                <p className="text-sm text-red-600 text-center">
                  {OtpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <Button
              className="w-full mt-4"
              type="submit"
              disabled={sendOtp.isPending}
            >
              {sendOtp.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      )}

      {step === "ResetPassword" && (
        <form
          className="space-y-4"
          onSubmit={PasswordForm.handleSubmit(handlePasswordSubmit)}
        >
          <h2 className="text-3xl font-semibold mb-5">Reset Password</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block ">New Password</label>
              <Input
                type="password"
                {...PasswordForm.register("newPassword")}
                className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter new password"
              />
              {PasswordForm.formState.errors.newPassword && (
                <div className="text-sm text-red-600 mt-1">
                  {PasswordForm.formState.errors.newPassword.message}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="block">Confirm New Password</label>
              <Input
                type="password"
                {...PasswordForm.register("confirmPassword")}
                className="w-full  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Confirm new password"
              />
              {PasswordForm.formState.errors.confirmPassword && (
                <div className="text-sm text-red-600 mt-1">
                  {PasswordForm.formState.errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-5"
            disabled={sendNewPassword.isPending}
          >
            {sendNewPassword.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
};

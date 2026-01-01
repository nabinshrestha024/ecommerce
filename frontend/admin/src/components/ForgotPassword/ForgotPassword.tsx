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
import { InputOTPField } from "../Otp/InputOtpField";

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

  return (
    <div className="max-h-[70vh] h-full overflow-y-auto overflow-x-hidden bg-white rounded-lg shadow-lg">
      {step === "Email" && (
        <form
          className="p-6 space-y-4"
          onSubmit={emailForm.handleSubmit(({ email }) => {
            sendEmail.mutate(
              { email },
              {
                onSuccess: () => {
                  setEmail(email);
                  setStep("OTP");
                },
              },
            );
          })}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Forgot Password
          </h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter your email address
            </label>
            <Input
              type="text"
              {...emailForm.register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="your@email.com"
            />
            {emailForm.formState.errors.email && (
              <div className="text-sm text-red-600 mt-1">
                {emailForm.formState.errors.email.message}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 py-2"
              disabled={sendEmail.isPending}
            >
              {sendEmail.isPending ? "Submitting..." : "Submit Email"}
            </Button>
          </div>
        </form>
      )}

      {step === "OTP" && (
        <form
          className="p-6 space-y-6"
          onSubmit={OtpForm.handleSubmit(({ otp }) => {
            sendOtp.mutate(
              { email, otp },
              {
                onSuccess: () => {
                  setOtp(otp);
                  setStep("ResetPassword");
                },
              },
            );
          })}
        >
          <div className="space-y-5">
            <div className="text-3xl font-bold">Verify OTP</div>

            <div className="space-y-2">
              <div>
                Enter your one-time password sent to{" "}
                <span className="text-blue-600">{email}</span>:
              </div>

              <div className="flex items-center justify-center mt-5">
                <InputOTPField
                  length={6}
                  value={OtpForm.watch("otp")}
                  onChange={(value) =>
                    OtpForm.setValue("otp", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  className="flex justify-center items-center gap-3"
                  slotClassName="
              h-12 w-12
              text-xl font-semibold
              border border-gray-400
              rounded-md
              focus:border-blue-500
              transition
              shrink-0
            "
                />
              </div>

              {OtpForm.formState.errors.otp && (
                <p className="text-sm text-red-600 text-center">
                  {OtpForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" disabled={sendOtp.isPending}>
                {sendOtp.isPending ? "Submitting..." : "Submit OTP"}
              </Button>
            </div>
          </div>
        </form>
      )}

      {step === "ResetPassword" && (
        <form
          className="p-6 space-y-4"
          onSubmit={PasswordForm.handleSubmit(({ newPassword }) => {
            sendNewPassword.mutate(
              { email, otp, newPassword },
              {
                onSuccess: () => {
                  setStep("Email");
                  onClose();
                },
              },
            );
          })}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Reset Password
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
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
          <div className="flex justify-center items-center pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto px-6 py-2"
              disabled={sendNewPassword.isPending}
            >
              {sendNewPassword.isPending ? "Submitting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

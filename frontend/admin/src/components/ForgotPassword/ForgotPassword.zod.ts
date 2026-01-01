import { z } from "zod";
export const EmailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});
export const OTPSchema = z.object({
  otp: z.string().min(1, "OTP is required"),
});
export const PasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });
export type PasswordType = z.infer<typeof PasswordSchema>;
export type EmailType = z.infer<typeof EmailSchema>;
export type OTPType = z.infer<typeof OTPSchema>;

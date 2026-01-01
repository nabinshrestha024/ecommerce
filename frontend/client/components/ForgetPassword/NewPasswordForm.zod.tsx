import { z } from "zod";

export const NewPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
    repassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

export type NewPasswordFormSchemaType = z.infer<typeof NewPasswordFormSchema>;

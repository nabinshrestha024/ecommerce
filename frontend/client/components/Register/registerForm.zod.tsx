import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
    repassword: z.string().min(1, "Confirm password is required"),
    profilePicture: z.custom<File>(
      (file) => file instanceof File,
      "Please upload an image",
    ),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    role: z.string().min(1, "Select atleast one role"),
    phoneNumber: z
      .string()
      .max(10, { message: "Phone number must be exactly 10 digits" })
      .regex(/^98\d{8}$/, { message: "Phone number must start with 98" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

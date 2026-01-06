import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ),
    repassword: z.string().min(1, "Confirm password is required"),
    dateOfBirth: z
      .string()
      .min(1, "Date of Birth is required")
      .refine((value) => {
        const dob = new Date(value);
        if (isNaN(dob.getTime())) return false;
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          return age - 1 >= 16;
        }

        return age >= 16;
      }, "You must be at least 16 years old"),
    gender: z.string().min(1, "Gender is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    phone: z
      .string()
      .max(10, { message: "Phone number must be exactly 10 digits" })
      .regex(/^98|97\d{8}$/, {
        message: "Phone number must start with 98 or 97",
      }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

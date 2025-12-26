import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  profilePicture: z.instanceof(File).optional(),

  fullName: z.string().min(1, "Full name is required").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .optional(),

  phoneNumber: z
    .string()
    .regex(
      /^9[87]\d{8}$/,
      "Phone number must start with 98 or 97 and be 10 digits",
    )
    .optional(),

  address: z.string().min(1, "Address is required").optional(),

  biography: z
    .string()
    .max(500, "Biography must be at most 500 characters")
    .min(1, "Biography is required")
    .optional(),

  dateOfBirth: z
    .string()
    .optional()
    .transform((val) => (val && val.length ? val : undefined))
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Invalid date format",
    })
    .refine(
      (val) => {
        if (!val) return true;
        const d = new Date(val);
        const today = new Date();
        d.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return d <= today;
      },
      {
        message: "Date of birth cannot be in the future",
      },
    ),
});

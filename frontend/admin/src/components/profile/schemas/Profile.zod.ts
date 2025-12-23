import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  profilePicture: z.instanceof(File).optional(),

  firstName: z.string().min(1, "First name is required").optional(),

  lastName: z.string().min(1, "Last name is required").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),

  email: z.string().email("Invalid email address").optional(),

  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),

  address: z.string().min(1, "Address is required").optional(),

  biography: z
    .string()
    .max(500, "Biography must be at most 500 characters")
    .optional(),

  dateOfBirth: z
    .date()
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .optional(),
});

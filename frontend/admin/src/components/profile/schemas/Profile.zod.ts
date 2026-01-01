import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  profileImageFile: z.instanceof(File).optional(),

  fullName: z.string().min(1, "Full name is required").optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),

  address: z.string().min(1, "Address is required").optional(),

  bio: z
    .string()
    .max(500, "Biography must be at most 500 characters")
    .min(1, "Biography is required")
    .optional(),
  city: z.string().min(1, "City is required").optional(),
  status: z.enum(["0", "1"]).optional(),
});
export type ProfileUpdateType = z.infer<typeof ProfileUpdateSchema>;

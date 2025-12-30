import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  country: z.string().min(1, "Country is required"),
  phone: z
    .string()
    .max(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^98\d{8}$/, { message: "Phone number must start with 98" }),
  details: z.string().min(1, "Details is required"),
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;

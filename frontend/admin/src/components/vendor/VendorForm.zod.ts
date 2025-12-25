import { z } from "zod";
export const VendorFormSchema = z.object({
  name: z.string().min(2, "Business Name must be at least 2 characters"),
  contactPerson: z
    .string()
    .min(2, "Contact Person must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  status: z.enum(["active", "inactive"], "Status must be active or inactive"),
  joinedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),
});

export type VendorFormValues = z.infer<typeof VendorFormSchema>;

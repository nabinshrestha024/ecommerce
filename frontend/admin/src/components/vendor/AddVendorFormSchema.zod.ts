import { z } from "zod";
export const AddVendorFormSchema = z.object({
  name: z.string().min(2, "Company Name must be at least 2 characters"),
  contactPerson: z
    .string()
    .min(2, "Contact Person must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type AddVendorFormValues = z.infer<typeof AddVendorFormSchema>;

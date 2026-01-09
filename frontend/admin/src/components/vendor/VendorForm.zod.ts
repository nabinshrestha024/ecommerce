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
    .regex(
      /^(98|97)\d{8}$/,
      "Phone number must start with 98 or 97 and be 10 digits long",
    ),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type VendorFormValues = {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
};

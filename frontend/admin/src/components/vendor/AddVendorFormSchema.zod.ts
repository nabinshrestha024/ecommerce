import { z } from "zod";
export const AddVendorFormSchema = {
  businessName: z
    .string()
    .min(2, "Business Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  productImage: z
    .instanceof(FileList)
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Product image is required",
    )
    .transform((files: FileList) => files[0]),
};

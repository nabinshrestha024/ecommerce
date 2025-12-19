import { z } from "zod";
export const VendorFormSchema = z.object({
  id: z.string().min(1, "Vendor ID is required"),
  businessName: z
    .string()
    .min(2, "Business Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  totalProducts: z.number().min(0, "Total Products cannot be negative"),
  completedOrders: z.number().min(0, "Completed Orders cannot be negative"),
  canceledOrders: z.number().min(0, "Canceled Orders cannot be negative"),
});

export type VendorFormValues = z.infer<typeof VendorFormSchema>;

import { z } from "zod";

export const CheckoutFormSchema = z.object({
  shippingName: z.string().min(1, "Shipping Name is required"),
  shippingAddress: z.string().min(1, "Shipping Address is required"),
  shippingCity: z.string().min(1, "Shipping City is required"),
  shippingPhone: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Phone number should be of 10 digits"),
});

export type CheckoutFormSchemaType = z.infer<typeof CheckoutFormSchema>;

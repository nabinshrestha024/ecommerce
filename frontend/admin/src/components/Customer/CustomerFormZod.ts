import { z } from "zod";

export const customerSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),

  name: z.string().min(1, "Customer name is required"),

  orderCount: z
    .string()
    .min(1, "Order Count is required")
    .regex(/^[0-9]+$/, "Order Count can only contain digits"),

  phone: z
    .string()
    .min(10, { message: "Phone number must be atleast 10 digit" })
    .regex(/^[0-9]+$/, "Phone number can only contain digits"),

  totalSpend: z
    .string()
    .min(1, "Total spend is required")
    .regex(/^[0-9]+$/, "Total spend can only contain digits"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

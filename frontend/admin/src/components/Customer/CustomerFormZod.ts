import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  address: z.string().min(1, "Address is required"),
  isActive: z.enum(["true", "false"], "Invalid status"),
  phone: z.coerce
    .string()
    .min(10, { message: "Phone number must be atleast 10 digit" })
    .regex(/^[0-9]+$/, "Phone number can only contain digits"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

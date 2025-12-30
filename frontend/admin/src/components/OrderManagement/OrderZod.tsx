import { z } from "zod";

export const orderSchema = z.object({
  status: z.string().min(2, "Status is required"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

import { z } from "zod";

export const DiscountAddSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),

  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),

  discountValue: z.coerce.number().min(1, "Max usages is required").positive(),
  discountType: z.string().min(1, "Discount Type is required"),
  discountName: z.string().min(1, "Discount Type is required"),
});

export type DiscountAddFormValues = z.infer<typeof DiscountAddSchema>;

import { z } from "zod";

export const DiscountSchema = z.object({
  productId: z.coerce.number().int().positive(),

  percentage: z.coerce
    .number()
    .min(1, "Percentage must be at least 1")
    .max(100, "Percentage cannot exceed 100"),

  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),

  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),

  maxUsage: z.coerce.number().min(1, "Max usages is required").positive(),

  perUserLimit: z.coerce
    .number()
    .min(1, "Per user limit is required")
    .positive(),
});

export type DiscountFormValues = z.infer<typeof DiscountSchema>;

import { z } from "zod";

export const DiscountAddSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),

  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be YYYY-MM-DD"),

  discountValue: z.coerce.number().min(1, "Max usages is required").positive(),
  discountType: z.string().min(2, "Discount Type is required"),
  discountName: z.string().min(2, "Discount Type is required"),
  productIds: z.array(z.coerce.number()).min(1, "Select any one product"),
  variantIds: z.array(z.coerce.number()).min(1, "Select any one product"),
});

export type DiscountAddFormValues = z.infer<typeof DiscountAddSchema>;

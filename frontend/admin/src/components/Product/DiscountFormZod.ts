import { z } from "zod";

export const discountSchema = z.object({
  discountId: z.coerce.number().min(1, "Discount ID is required"),
});

export type DiscountFormValues = z.infer<typeof discountSchema>;

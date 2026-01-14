import { z } from "zod";

export const variantSchema = z.object({
  price: z.coerce
    .number("Price is required")
    .gt(0, "Price must be greater than 0"),

  stockQuantity: z.coerce
    .number("Price is required")
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),

  isActive: z.enum(["true", "false"] as const, {
    error: () => ({ message: "Invalid feature" }),
  }),
});

export type VariantFormValues = z.infer<typeof variantSchema>;

import { z } from "zod";

export const attributeNameSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
});

export type AttributeNameFormValues = z.infer<typeof attributeNameSchema>;

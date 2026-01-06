import { z } from "zod";

export const attributeSchema = z.object({
  value: z.string().min(2, "Attribute value must be at least 2 characters"),
});

export type AttributeFormValues = z.infer<typeof attributeSchema>;

import { z } from "zod";

export const productSchema = z.object({
  categoryId: z.coerce.number().min(1, "Category ID is required"),

  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  isActive: z.boolean(),

  primaryIndex: z.coerce.number(),

  image: z.custom<File>(
    (file) => file instanceof File,
    "Please upload an image",
  ),
});

export type ProductFormValues = z.infer<typeof productSchema>;

import { z } from "zod";

export const productSchema = z.object({
  productId: z.coerce.number().min(1, "Product ID is required"),

  categoryId: z.coerce.number().min(1, "Category ID is required"),

  name: z.string().min(2, "Product name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  stockQuantity: z.coerce
    .number()
    .min(1, "Stock quantity is required")
    .positive("Stock quantity must be greater than 0"),

  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  price: z.coerce
    .number()
    .min(1, "Price is required")
    .positive("Price must be greater than 0"),

  isActive: z.boolean(),

  primaryIndex: z.coerce.number(),

  image: z.custom<File>(
    (file) => file instanceof File,
    "Please upload an image",
  ),
});

export type ProductFormValues = z.infer<typeof productSchema>;

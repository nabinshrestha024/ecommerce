import { z } from "zod";

export const productSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),

  categoryId: z.string().min(1, "Category ID is required"),

  name: z.string().min(2, "Product name must be at least 2 characters"),

  brand: z.string().min(1, "Brand is required"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z
    .number()
    .min(1, "Price is required")
    .positive("Price must be greater than 0"),

  isActive: z.boolean(),

  createdAt: z.string().min(1, "Created date is required"),

  updatedAt: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

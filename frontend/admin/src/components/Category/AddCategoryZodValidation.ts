import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  categoryImageURL: z
    .file()
    .optional()
    .refine(
      (file) => file === undefined || file instanceof File,
      "Invalid image file",
    ),

  description: z.string().min(2, "Description must be at least 2 characters"),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  sortOrder: z.coerce.number().min(0, "Sort Order is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

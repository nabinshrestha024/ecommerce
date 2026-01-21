import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  categoryImageURL: z
    .file()
    .optional()
    .refine(
      (file) => file === undefined || file instanceof File,
      "Invalid image file",
    ),

  description: z.string().min(2, "Description is required"),
  isFeatured: z.boolean("Select isFeatured"),
  isActive: z.boolean("Select isActive"),
  sortOrder: z.coerce.number().min(0, "Sort Order is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

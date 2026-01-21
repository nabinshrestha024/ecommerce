import { z } from "zod";

export const bannerSchema = z.object({
  title: z.string().min(1, "Category name is required"),
  imageUrl: z
    .file()
    .optional()
    .refine(
      (file) => file === undefined || file instanceof File,
      "Invalid image file",
    ),

  description: z.string().min(1, "Description is required"),
  redirectUrl: z.string().min(1, "Url is required"),
  isActive: z.boolean("Select isActive"),
  sortOrder: z.coerce.number().min(0, "Sort Order is required"),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;

import { z } from "zod";

const stringField = (message: string) =>
  z.preprocess(
    (val) => (val === undefined || val === null ? "" : val),
    z.string().min(1, message),
  );
export const ProductFormSchema = z
  .object({
    name: stringField("Product name is required"),

    shortDescription: stringField("Short description is required"),
    description: stringField("Description is required"),
    productPrice: z.coerce
      .number({ message: "Product price must be a number" })
      .min(1, "Product price is required"),

    discountedPrice: z
      .union([
        z.string().length(0),
        z.coerce.number().min(0, "Discounted price must be at least 0"),
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),

    categoryId: z.coerce.number().min(1, "Product category is required"),

    images: z
      .instanceof(FileList)
      .refine(
        (files) => files.length > 0,
        "At least one product image is required",
      ),

    primaryIndex: z
      .union([z.coerce.number().int(), z.string().length(0)])
      .optional()
      .transform((val) => (val === "" ? undefined : Number(val))),

    stockQuantity: z.coerce
      .number({ message: "Stock quantity must be a number" })
      .optional(),

    isActive: z.boolean().optional(),

    highlightFeatured: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.discountedPrice) return true;
      return Number(data.discountedPrice) <= data.productPrice;
    },
    {
      message: "Discounted price cannot be greater than product price",
      path: ["discountedPrice"],
    },
  );

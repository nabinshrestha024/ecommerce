import { z } from "zod";

const stringField = (message: string) =>
  z.preprocess(
    (val) => (val === undefined || val === null ? "" : val),
    z.string().min(1, message),
  );

export const ProductFormSchema = z
  .object({
    productName: stringField("Product name is required"),

    productDescription: stringField("Product description is required"),

    productPrice: z.coerce
      .number({ message: "Product price must be a number" })
      .min(1, "Product price is rerquired"),

    discountedPrice: z
      .union([
        z.string().length(0),
        z.coerce.number().min(0, "Discounted price must be at least 0"),
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),

    productCategories: z.string().min(1, "Product category is required"),

    productImage: z
      .instanceof(FileList)
      .optional()
      .transform((files) => (files && files.length > 0 ? files[0] : undefined)),

    stockQuantity: z.coerce
      .number({ message: "Stock quantity must be a number" })
      .min(0, "Stock quantity must be at least 0"),

    expirationStart: z
      .union([z.string().length(0), z.string().date()])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),

    expirationEnd: z
      .union([z.string().length(0), z.string().date()])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),

    productTags: z.string().min(1, "At least one tag is required"),

    taxIncluded: z.enum(["yes", "no"]).optional(),

    stockStatus: z.string().min(1, "Stock status is required"),

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
  )
  .refine(
    (data) => {
      if (!data.expirationStart || !data.expirationEnd) return true;
      const start =
        typeof data.expirationStart === "string"
          ? new Date(data.expirationStart)
          : (data.expirationStart as Date);
      const end =
        typeof data.expirationEnd === "string"
          ? new Date(data.expirationEnd)
          : (data.expirationEnd as Date);
      return end.getTime() >= start.getTime();
    },
    {
      message: "End date cannot be before start date",
      path: ["expirationEnd"],
    },
  );

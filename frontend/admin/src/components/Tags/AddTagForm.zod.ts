import { z } from "zod";

export const AddTagFormSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
});

export type AddTagFormSchemaType = z.infer<typeof AddTagFormSchema>;

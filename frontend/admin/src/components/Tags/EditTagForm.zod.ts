import { z } from "zod";

export const EditTagFormSchema = z.object({
  tagname: z.string().min(1, "Tag name is required"),
});

export type EditTagFormSchemaType = z.infer<typeof EditTagFormSchema>;

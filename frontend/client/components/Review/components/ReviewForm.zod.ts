import { z } from "zod";

export const ReviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  content: z.string().min(1, "Please write a review"),
});

export type ReviewFormValues = z.infer<typeof ReviewFormSchema>;

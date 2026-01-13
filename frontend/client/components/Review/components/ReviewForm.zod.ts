import { z } from "zod";

export const ReviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  content: z
    .string()
    .min(1, "Please write a review")
    .max(250, "Review must be at most 250 characters"),
});

export type ReviewFormValues = z.infer<typeof ReviewFormSchema>;

import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

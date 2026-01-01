import { z } from "zod";

export const SocialLinkSchema = z.object({
  instagram: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]{1,30}\/?$/,
      "Invalid Instagram URL",
    )
    .optional(),

  facebook: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]{5,}\/?$/,
      "Invalid Facebook URL",
    )
    .optional(),

  twitter: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/@?[A-Za-z0-9_]{1,15}\/?$/,
      "Invalid Twitter/X URL",
    )
    .optional(),
});

export type SocialLinkType = z.infer<typeof SocialLinkSchema>;

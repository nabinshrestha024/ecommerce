import { z } from "zod";

export const SocialLinksSchema = z.object({
  facebook: z
    .string()
    .regex(
      /^$|^https?:\/\/(www\.)?facebook\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9.]{5,50})\/?$/,
      "Invalid Facebook profile URL",
    )
    .optional(),
  instagram: z
    .string()
    .regex(
      /^$|^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?$/,
      "Invalid Instagram profile URL",
    )
    .optional(),
  x: z
    .string()
    .regex(
      /^$|^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[a-zA-Z0-9_]{1,15}\/?$/,
      "Invalid X (Twitter) profile URL",
    )
    .optional(),
});

export type SocialLinksSchemaType = z.infer<typeof SocialLinksSchema>;

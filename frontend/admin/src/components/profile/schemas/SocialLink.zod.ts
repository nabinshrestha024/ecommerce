import { z } from "zod";

export const SocialLinkSchema = z.object({
  platform: z.string().optional(),
  profileLinkUrl: z.string().optional(),
});
export type SocialLinkType = z.infer<typeof SocialLinkSchema>;

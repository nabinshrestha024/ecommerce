import { SocialLink } from "@/components/Profile/SocialLinks";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

type SocialLinksResponse = {
  message: string;
  links: SocialLink[];
};

export const fetchSocialLinks = async () => {
  const res = await axiosInstance.get<SocialLinksResponse>(
    endpoint.SOCIALLINKS,
  );
  return res.data;
};

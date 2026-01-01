import { SocialLink } from "@/components/Profile/SocialLinks";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const addSocialLinks = async ({ data }: { data: SocialLink }) => {
  const res = await axiosInstance.post(endpoint.SOCIALLINKS, data);
  return res.data;
};

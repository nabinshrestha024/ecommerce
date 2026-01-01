import { SocialLink } from "@/components/Profile/SocialLinks";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const updateSocialLinks = async ({
  id,
  data,
}: {
  id: number;
  data: SocialLink;
}) => {
  const res = await axiosInstance.put(`${endpoint.SOCIALLINKS}/${id}`, data);
  return res.data;
};

import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
interface Social {
  socialLinkId: number;
  platform: "Instagram" | "Facebook" | "Twitter";
  profileLinkUrl: string;
  createdAt: string;
}

export const getPostSocial = async ({ socialData }: { socialData: Social }) => {
  const res = await axiosInstance.post(endpoint.SOCIALLINKS, socialData);
  return res.data;
};

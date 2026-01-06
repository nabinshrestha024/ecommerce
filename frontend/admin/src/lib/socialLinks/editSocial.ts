import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
interface Social {
  socialLinkId: number;
  platform: "Instagram" | "Facebook" | "Twitter";
  profileLinkUrl: string;
  createdAt: string;
}

export const editSocial = async ({
  socialData,
  socialLinkId,
}: {
  socialLinkId: number;
  socialData: Social;
}) => {
  const res = await axiosInstance.put(
    `${endpoint.SOCIALLINKS}/${socialLinkId}`,
    socialData,
  );
  return res.data;
};

import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
export interface Social {
  platform: string;
  profileLinkUrl: string;
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

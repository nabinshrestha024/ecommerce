import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

interface Social {
  platform: string;
  profileLinkUrl: string;
}

export const postSocial = async ({ socialData }: { socialData: Social }) => {
  const res = await axiosInstance.post(endpoint.SOCIALLINKS, socialData);
  return res.data;
};

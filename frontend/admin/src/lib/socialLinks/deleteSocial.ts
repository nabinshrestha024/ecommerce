import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const deleteSocial = async (socialLinkId: number) => {
  const res = await axiosInstance.delete(
    `${endpoint.SOCIALLINKS}/${socialLinkId}`,
  );
  return res.data;
};

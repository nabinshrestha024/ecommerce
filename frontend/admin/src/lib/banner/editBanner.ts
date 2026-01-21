import type { BannerData } from "@/hooks/banner/useFetchBanner";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const editBanner = async ({
  bannerId,
  bannerData,
}: {
  bannerId: number;
  bannerData: BannerData;
}) => {
  const formData = new FormData();

  formData.append("title", bannerData.title);
  formData.append("description", bannerData.description || "");
  formData.append("sortOrder", String(bannerData.sortOrder));
  formData.append("isFeatured", String(bannerData.redirectUrl));
  formData.append("isActive", String(bannerData.isActive));

  if (bannerData.imageUrl) {
    formData.append("image", bannerData.imageUrl);
  }
  const res = await axiosInstance.put(
    `${endpoint.FETCH_BANNER}/${bannerId}`,
    formData,
  );

  return res.data;
};

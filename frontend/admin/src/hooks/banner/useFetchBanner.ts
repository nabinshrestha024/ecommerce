"use client";
import { fetchBanner } from "@/lib/banner/fetchBanner";
import { useQuery } from "@tanstack/react-query";

export type BannerData = {
  bannerId: number;
  title: string;
  imageUrl: File;
  description: string;
  redirectUrl: string;
  sortOrder: number;
  isActive: boolean;
};
type bannerResponse = {
  data: BannerData[];
};

export const useFetchBanner = () => {
  const { data, isLoading, isError, refetch } = useQuery<bannerResponse>({
    queryKey: ["bannerData"],
    queryFn: fetchBanner,
  });
  return { data, isLoading, isError, refetch };
};

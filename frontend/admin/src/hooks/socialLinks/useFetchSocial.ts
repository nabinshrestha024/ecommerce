"use client";

import { fetchSocial } from "@/lib/socialLinks/fetchSocial";
import { useQuery } from "@tanstack/react-query";

interface Social {
  socialLinkId: number;
  platform: "Instagram" | "Facebook" | "Twitter";
  profileLinkUrl: string;
  createdAt: string;
}

export const useFetchSocial = () => {
  const { data, isLoading, isError, refetch } = useQuery<Social[]>({
    queryKey: ["socialData"],
    queryFn: fetchSocial,
  });
  return { data, isLoading, isError, refetch };
};

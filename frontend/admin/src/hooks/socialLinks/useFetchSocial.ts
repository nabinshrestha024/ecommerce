"use client";

import { fetchSocial } from "@/lib/socialLinks/fetchSocial";
import { useQuery } from "@tanstack/react-query";

type SocialRespone = {
  links: Social[];
};

interface Social {
  socialLinkId: number;
  platform: string;
  profileLinkUrl: string;
  createdAt: string;
}

export const useFetchSocial = () => {
  const { data, isLoading, isError, refetch } = useQuery<SocialRespone>({
    queryKey: ["socialData"],
    queryFn: fetchSocial,
  });
  return { data, isLoading, isError, refetch };
};

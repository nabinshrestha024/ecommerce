"use client";

import { getUser } from "@/lib/user/getUser";
import { useQuery } from "@tanstack/react-query";

type userData = {
  userId: number;
  email: string;
  fullName: string;
  passwordHash: string | null;
  status: number;
  profileImageUrl: string | null;
  phone: string;
  address: string;
  city: string;
  role: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userProfile: string;
  socialLinks: string;
  orders: string;
};

type userResponse = {
  data: userData[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export const useUser = (pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<userResponse>({
    queryKey: ["userData"],
    queryFn: () => getUser(pageIndex),
  });
  return { data, isLoading, isError, refetch };
};

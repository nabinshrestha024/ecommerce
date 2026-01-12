"use client";

import type { Person } from "@/components/Customer/CustomerProfile";
import { getUser } from "@/lib/user/getUser";
import { useQuery } from "@tanstack/react-query";

type userResponse = {
  data: Person[];
  page: number;
  pageSize: number;
  totalCount: number;
};

export const useUser = (pageIndex: number, pageSize: number) => {
  const { data, isLoading, isError, refetch } = useQuery<userResponse>({
    queryKey: ["userData", pageIndex, pageSize],
    queryFn: () => getUser(pageIndex, pageSize),
  });
  return { data, isLoading, isError, refetch };
};

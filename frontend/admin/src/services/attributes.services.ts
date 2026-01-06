import type { AttributesType } from "@/hooks/attribute/useGetAttribute";
import { axiosInstance } from "@/lib/axiosInstance";
import { endpoint } from "@/lib/endpoint";

export const getAttributes = async () => {
  const response = await axiosInstance.get<AttributesType[]>(
    endpoint.ATTRIBUTES,
  );
  return response.data;
};

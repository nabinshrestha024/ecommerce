"use client";
import { Attribute } from "@/lib/attribute/fetchAttribute";
import { useQuery } from "@tanstack/react-query";

export interface AttributeValue {
  attributeValueId: number;
  value: string;
  attributeId: number;
}

export interface ProductAttribute {
  attributeId: number;
  isVariant: boolean;
  name: string;
  values: AttributeValue[];
}

export const useFetchAttribute = () => {
  const { data, isLoading, isError, refetch } = useQuery<ProductAttribute[]>({
    queryKey: ["attributeData"],
    queryFn: Attribute,
  });
  return { data, isLoading, isError, refetch };
};

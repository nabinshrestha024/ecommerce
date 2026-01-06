import { getAttributes } from "@/services/attributes.services";
import { useQuery } from "@tanstack/react-query";

export type AttributeValue = {
  attributeValueId: number;
  value: string;
  attributeId: number;
};

export interface AttributesType {
  attributeId: number;
  name: string;
  isVariant: boolean;
  values: AttributeValue[];
}

export const useGetAttributes = () => {
  const data = useQuery<AttributesType[]>({
    queryKey: ["attributes"],
    queryFn: getAttributes,
  });
  return data;
};

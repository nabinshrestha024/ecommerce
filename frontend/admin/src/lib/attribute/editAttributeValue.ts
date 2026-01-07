import type { AttributeFormValues } from "@/components/AttributeManagement/AttributeZodValidation";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const editAttributeValue = async ({
  attributeValueId,
  attributeValueData,
}: {
  attributeValueId: number;
  attributeValueData: AttributeFormValues;
}) => {
  const res = await axiosInstance.put(
    `${endpoint.ATTRIBUTES}/values/${attributeValueId}`,
    attributeValueData,
  );
  return res.data;
};

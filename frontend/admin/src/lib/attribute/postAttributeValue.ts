import type { AttributeFormValues } from "@/components/AttributeManagement/AttributeZodValidation";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const postAttributeValue = async ({
  attributeId,
  data,
}: {
  attributeId: number;
  data: AttributeFormValues;
}) => {
  const res = await axiosInstance.post(
    `${endpoint.ATTRIBUTES}/${attributeId}/values`,
    data,
  );
  return res.data;
};

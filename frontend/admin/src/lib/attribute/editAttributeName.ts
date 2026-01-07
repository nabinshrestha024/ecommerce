import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";
import type { AttributeNameFormValues } from "@/components/AttributeManagement/AddAttributeZodValidation";

export const editAttributeName = async ({
  attributeId,
  attributeData,
}: {
  attributeId: number;
  attributeData: AttributeNameFormValues;
}) => {
  const res = await axiosInstance.put(
    `${endpoint.ATTRIBUTES}/${attributeId}`,
    attributeData,
  );
  return res.data;
};

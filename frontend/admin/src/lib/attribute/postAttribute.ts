import type { AttributeNameFormValues } from "@/components/AttributeManagement/AddAttributeZodValidation";
import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export const postAttribute = async (data: AttributeNameFormValues) => {
  const res = await axiosInstance.post(endpoint.ATTRIBUTES, data);
  return res.data;
};

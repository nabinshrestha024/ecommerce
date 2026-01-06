import { axiosInstance } from "../axiosInstance";
import { endpoint } from "../endpoint";

export interface TagType {
  tagId: number;
  name: string;
}

export const fetchTag = async () => {
  const res = await axiosInstance.get<TagType[]>(endpoint.TAGS);
  return res.data;
};

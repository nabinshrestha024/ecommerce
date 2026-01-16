import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import { useForm, type Resolver } from "react-hook-form";
import type { ProductAttribute } from "@/hooks/attribute/useFetchAttribute.ts";
import {
  attributeNameSchema,
  type AttributeNameFormValues,
} from "./AddAttributeZodValidation.tsx";
import { useEditAttributeName } from "@/hooks/attribute/useEditAttributeName.ts";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  attributeName: ProductAttribute;
  setEditOpen: Dispatch<SetStateAction<number | null>>;
};
export const EditAttributeNameForm = ({
  attributeName,
  setEditOpen,
}: Props) => {
  const editAttributeName = useEditAttributeName();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttributeNameFormValues>({
    resolver: zodResolver(
      attributeNameSchema,
    ) as Resolver<AttributeNameFormValues>,
    defaultValues: {
      name: attributeName.name,
    },
    mode: "onChange",
  });

  const onSubmit = (data: AttributeNameFormValues) => {
    const updateAttributeName: ProductAttribute = {
      ...attributeName,
      name: data.name,
    };

    editAttributeName.mutate(
      {
        attributeId: attributeName.attributeId,
        attributeData: updateAttributeName,
      },
      {
        onSuccess: () => {
          setEditOpen(null);
        },
      },
    );
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Edit Attribute Name
        </div>
        <div className="flex-1 overflow-auto mt-5">
          <div className="flex gap-4 w-full">
            <label className=" font-medium text-gray-700">Attribute Name</label>
            <div className="flex-1">
              <Input
                type="text"
                placeholder=""
                {...register("name")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.name ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
              />
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-10">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Value Changes
          </button>
        </div>
      </form>
    </div>
  );
};

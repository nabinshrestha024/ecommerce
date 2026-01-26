import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import {
  attributeSchema,
  type AttributeFormValues,
} from "./AttributeZodValidation.tsx";
import { useForm, type Resolver } from "react-hook-form";
import type { AttributeValue } from "@/hooks/attribute/useFetchAttribute.ts";
import { useEditAttributeValue } from "@/hooks/attribute/useEditAttributeValues.ts";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  attributeValues: AttributeValue;
  setEditAttribOpen: Dispatch<SetStateAction<number | null>>;
};
export const EditAttributeValueForm = ({
  attributeValues,
  setEditAttribOpen,
}: Props) => {
  const editAttributeValue = useEditAttributeValue();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeSchema) as Resolver<AttributeFormValues>,
    defaultValues: {
      value: attributeValues.value,
    },
    mode: "onChange",
  });

  const onSubmit = (data: AttributeFormValues) => {
    const updatedAttributevalue: AttributeValue = {
      ...attributeValues,
      value: data.value,
    };

    editAttributeValue.mutate(
      {
        attributeValueId: attributeValues.attributeValueId,
        attributeValueData: updatedAttributevalue,
      },
      {
        onSuccess: () => {
          setEditAttribOpen(null);
        },
      },
    );
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Edit Attribute Values
        </div>
        <div className="flex-1 overflow-auto mt-5">
          <div className="flex gap-4 items-center w-full">
            <label className=" font-medium text-gray-700">
              Attribute Values
            </label>
            <div className="flex-1">
              <Input
                type="text"
                placeholder=""
                {...register("value")}
                className={`w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:ring-0 ${errors.value ? "border-red-500 focus-visible:border-red-500" : " border-[#DFE0E1] focus-visible:border-[#DFE0E1]"}`}
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

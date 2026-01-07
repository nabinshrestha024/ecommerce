import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import { useForm, type Resolver } from "react-hook-form";
import {
  AddTagFormSchema,
  type AddTagFormSchemaType,
} from "./AddTagForm.zod.ts";
import { useAddTag } from "@/hooks/tags/useAddTag.tsx";
import type { Dispatch, SetStateAction } from "react";
export const AddTagForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const addTag = useAddTag();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTagFormSchemaType>({
    resolver: zodResolver(AddTagFormSchema) as Resolver<AddTagFormSchemaType>,
    mode: "onChange",
  });
  const onSubmit = (data: AddTagFormSchemaType) => {
    addTag.mutate(data.name, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Add Tag
        </div>
        <div className="flex-1 overflow-auto mt-5">
          <div className="flex gap-4 w-full items-center">
            <label className=" font-medium text-gray-700">Name</label>
            <div className="flex-1">
              <Input
                type="text"
                placeholder=""
                {...register("name")}
                className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
              />
              {errors.name && (
                <p className="text-[12px] text-red-500 ">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-10">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Attribute
          </button>
        </div>
      </form>
    </div>
  );
};

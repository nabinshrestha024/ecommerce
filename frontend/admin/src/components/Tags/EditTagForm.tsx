import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import {
  EditTagFormSchema,
  type EditTagFormSchemaType,
} from "./EditTagForm.zod.ts";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useUpdateTag } from "@/hooks/tags/useUpdateTag.tsx";
import { Input } from "@/ui/input.tsx";
interface EditTagFormProps {
  tag: { tagId: number; name: string };
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditTagForm = ({ tag, setOpen }: EditTagFormProps) => {
  const editTag = useUpdateTag();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTagFormSchemaType>({
    resolver: zodResolver(EditTagFormSchema) as Resolver<EditTagFormSchemaType>,
    mode: "onChange",
    defaultValues: { tagname: tag.name },
  });
  useEffect(() => {
    reset({ tagname: tag.name });
  }, [tag.tagId, tag.name, reset]);
  const onSubmit = (data: EditTagFormSchemaType) => {
    editTag.mutate(
      { tagId: tag.tagId, tagData: { name: data.tagname } },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: () => {
          reset({ tagname: tag.name });
        },
      },
    );
  };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 ">
          Edit Tag
        </div>
        <div className="flex-1 overflow-auto mt-5">
          <div className="flex gap-4 w-full items-center">
            <label className=" font-medium text-gray-700">Name</label>
            <div className="flex-1">
              <Input
                type="text"
                placeholder=""
                {...register("tagname")}
                className={`w-full px-4 py-2 border rounded focus-visible:ring-0 ${
                  errors.tagname ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-10">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
          >
            Save Tag
          </button>
        </div>
      </form>
    </div>
  );
};

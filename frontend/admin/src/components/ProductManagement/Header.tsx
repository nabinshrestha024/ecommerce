import { Button } from "@/ui/button";
import { GoTag } from "react-icons/go";
import { MdAddCircleOutline } from "react-icons/md";

export const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GoTag className="text-[#4EA674]" />
          Product Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage, organize, and publish your products efficiently.
        </p>
      </div>
      <div className="flex flex-row gap-2 sm:gap-4 shrink-0 w-full lg:w-auto">
        <Button
          variant="default"
          className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]"
          type="submit"
          form="productForm"
        >
          <MdAddCircleOutline className="text-white text-[24px]" />
          <span className="hidden sm:inline">Add new product</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </div>
  );
};

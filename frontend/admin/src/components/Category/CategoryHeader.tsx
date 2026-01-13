import { Button } from "@/ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { Dialog } from "../Dialog/Dialog";
import { AddCategoryForm } from "./AddCategoryForm";
import { useState } from "react";

export const CategoryHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GoTag className="text-[#4EA674]" />
            Category
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, and organize product categories efficiently.
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          triggerContent={
            <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
              <MdAddCircleOutline className="text-white text-[24px]" />
              Add Category
            </Button>
          }
        >
          <AddCategoryForm setOpen={setOpen} />
        </Dialog>
      </div>
    </div>
  );
};

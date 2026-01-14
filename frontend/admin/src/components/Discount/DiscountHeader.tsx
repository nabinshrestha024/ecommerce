import { Button } from "@/ui/button";
import { Dialog } from "../Dialog/Dialog";
import { GoPlusCircle } from "react-icons/go";
import { useState } from "react";
import { AddDiscountForm } from "./AddDiscountForm";

export const DiscountHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Discount Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create, manage, and organize discounts with ease.
        </p>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        triggerContent={
          <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
            <GoPlusCircle size={20} />
            Add Discount
          </Button>
        }
      >
        <AddDiscountForm />
      </Dialog>
    </div>
  );
};

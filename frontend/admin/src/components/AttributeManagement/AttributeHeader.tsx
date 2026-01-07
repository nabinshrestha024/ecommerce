import { Button } from "@/ui/button";
import { Dialog } from "../Dialog/Dialog";
import { GoPlusCircle, GoTag } from "react-icons/go";
import { AddAttributeForm } from "./AddAttributeForm";
import { useState } from "react";

export const AttributeHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GoTag className="text-[#4EA674]" />
          Attribute Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Organize and label your product data using custom attributes and
          values.
        </p>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        triggerContent={
          <Button className="rounded-full px-6 py-5 bg-[#4EA674] hover:bg-[#2a5f41] transition-all shadow-md hover:shadow-lg gap-2">
            <GoPlusCircle size={20} />
            Add Attribute
          </Button>
        }
      >
        <AddAttributeForm />
      </Dialog>
    </div>
  );
};

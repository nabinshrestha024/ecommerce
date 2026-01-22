import { Dialog } from "@/components/Dialog/Dialog";
import { ProductTable } from "@/components/Product/ProductTable";
import { Button } from "@/ui/button";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { ProductManagement } from "./product-management";

export const Product = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5 p-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, update, and manage products across your store.
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          triggerContent={
            <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
              <GoPlusCircle size={20} />
              Add Attribute
            </Button>
          }
          className=" w-[95vw] max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto">
            <ProductManagement setOpen={setOpen} />
          </div>
        </Dialog>
      </div>
      <ProductTable />
    </div>
  );
};

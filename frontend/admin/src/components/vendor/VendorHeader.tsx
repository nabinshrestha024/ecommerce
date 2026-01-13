import { MdAddCircleOutline } from "react-icons/md";
import { AddVendorForm } from "./AddVendorForm";
import { Dialog } from "../Dialog/Dialog";
import { GoTag } from "react-icons/go";
import { Button } from "@/ui/button";

export const VendorHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GoTag className="text-[#4EA674]" />
          Vendor Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage vendors, partnerships, and business relationships.
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-full  flex gap-3 items-center rounded-xl ">
          <Dialog
            triggerContent={
              <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
                <MdAddCircleOutline className="text-[20px]" />
                Add Vendor
              </Button>
            }
          >
            <div className="max-h-[70vh] overflow-y-auto px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {" "}
              <AddVendorForm />
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

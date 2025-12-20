import { MdAddCircleOutline } from "react-icons/md";
import { AddVendorForm } from "./AddVendorForm";
import { Dialog } from "../Dialog/Dialog";

export const VendorHeader = () => {
  return (
    <div className="flex justify-between mb-8">
      <div className="text-[18px] leading-6 font-bold ">Vendors</div>
      <div className="flex gap-2 items-center">
        <div className="w-full  flex gap-3 items-center rounded-xl ">
          <Dialog
            triggerContent={
              <div className="flex items-center gap-2 px-5 py-2 text-[15px] font-bold bg-[#4EA674] text-white rounded-lg hover:bg-[#3E8E5F] cursor-pointer">
                <MdAddCircleOutline className="text-[20px]" />
                Add Vendor
              </div>
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

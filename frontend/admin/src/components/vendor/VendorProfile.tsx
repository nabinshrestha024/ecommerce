import { Card } from "../Card/Card";
import { FaPhoneAlt } from "react-icons/fa";
import { RxCopy } from "react-icons/rx";

interface Vendor {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  address?: string;
  status?: "active" | "inactive";
  joinedOn?: string;
}

export const VendorProfile = ({ vendor }: { vendor: Vendor }) => {
  return (
    <Card
      className="w-full flex flex-col gap-6 p-5 rounded-lg"
      cardClassName="p-0 border border-[#E5E7EB]"
    >
      <div className="flex items-center gap-4">
        <div className="w-full flex flex-col gap-1">
          <div className="text-[18px] font-bold ">{vendor.businessName}</div>

          <div className="flex justify-between items-center">
            <div className="text-[14px] ">{vendor.email}</div>
            <RxCopy className="text-[#6467F2] text-[13px] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-[14px] ">Vendor Info</div>

        <div className="flex items-center gap-3 border border-[#E5E7EB] rounded-sm px-2 py-2.5">
          <FaPhoneAlt className=" text-[13px]" />
          <div className="text-[14px]  font-medium">{vendor.phone}</div>
        </div>

        <div className="flex items-center gap-3 border border-[#E5E7EB] rounded-sm px-2 py-2.5">
          <div className="text-[14px]  font-medium">{vendor.address}</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[14px] ">Activity</div>

        <div className="text-[14px] ">Joined On: {vendor.joinedOn}</div>

        <div className="text-[14px] ">Status: {vendor.status}</div>
      </div>
    </Card>
  );
};

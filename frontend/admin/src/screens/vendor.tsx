import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorTable } from "@/components/vendor/VendorTable";

export const Vendor = () => {
  return (
    <div className="w-full pt-6 pr-11 pb-24 pl-5">
      <VendorHeader />
      <VendorTable />
    </div>
  );
};

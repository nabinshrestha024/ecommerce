import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorTable } from "@/components/vendor/VendorTable";

export const Vendor = () => {
  return (
    <div className="w-full p-5 space-y-5">
      <VendorHeader />
      <VendorTable />
    </div>
  );
};

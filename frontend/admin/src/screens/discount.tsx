import { DiscountHeader } from "@/components/Discount/DiscountHeader";
import { DiscountTable } from "@/components/Discount/DiscountTable";

export const Discount = () => {
  return (
    <div className="p-4 flex flex-col gap-5">
      <DiscountHeader />
      <DiscountTable />
    </div>
  );
};

import { CustomerDetails } from "@/components/Customer/CustomerDetails";
import { CustomerHeader } from "@/components/Customer/CustomerHeader";
import { CustomerOverviewChart } from "@/components/Customer/CustomerOverviewChart";
import { CustomerTable } from "@/components/Customer/CustomerTable";

export const Customer = () => {
  return (
    <div className=" p-5 flex flex-col gap-5 w-full">
      <CustomerHeader />
      <div className="flex gap-5">
        <CustomerDetails />
        <CustomerOverviewChart />
      </div>
      <CustomerTable />
    </div>
  );
};

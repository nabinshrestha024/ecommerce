import { CustomerDetails } from "@/components/Customer/CustomerDetails";
import { CustomerOverviewChart } from "@/components/Customer/CustomerOverviewChart";
import { CustomerTable } from "@/components/Customer/CustomerTable";

export const Customer = () => {
  return (
    <div className=" pt-5 pb-[50px] pr-11 pl-5 flex flex-col gap-5">
      <div className="flex gap-5">
        <CustomerDetails />
        <CustomerOverviewChart />
      </div>
      <CustomerTable />
    </div>
  );
};

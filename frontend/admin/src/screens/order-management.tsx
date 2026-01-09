import { OrderDashboard } from "@/components/OrderManagement/OrderDashboard";
import { OrderTable } from "@/components/OrderManagement/OrderTable";

export const OrderManagement = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-5">
      <OrderDashboard />
      <OrderTable />
    </div>
  );
};

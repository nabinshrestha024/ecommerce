import { OrderDashboard } from "@/components/OrderManagement/OrderDashboard";
import { OrderTable } from "@/components/OrderManagement/OrderTable";

export const OrderManagement = () => {
  return (
    <div className="p-3 space-y-4 w-full">
      <OrderDashboard />
      <OrderTable />
    </div>
  );
};

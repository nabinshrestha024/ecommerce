import { DashboardChart } from "@/components/Dashboard/DashboardChart";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { DashboardTopSelling } from "@/components/Dashboard/DashboardTopSelling";
import { DashboardTransaction } from "@/components/Dashboard/DashboardTransaction";

export const Dashboard = () => {
  return (
    <div className="w-full space-y-5 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage products, orders, and view sales overview from one place.
          </p>
        </div>
      </div>
      <DashboardStats />
      <DashboardChart />
      <DashboardTransaction />
      <DashboardTopSelling />
    </div>
  );
};

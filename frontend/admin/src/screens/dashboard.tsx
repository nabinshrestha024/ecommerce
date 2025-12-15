import { DashboardChart } from "@/components/Dashboard/DashboardChart";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { DashboardTopSelling } from "@/components/Dashboard/DashboardTopSelling";
import { DashboardTransaction } from "@/components/Dashboard/DashboardTransaction";

export const Dashboard = () => {
  return (
    <div className="w-full space-y-5 px-5">
      <DashboardStats />
      <DashboardChart />
      <DashboardTransaction />
      <DashboardTopSelling />
    </div>
  );
};

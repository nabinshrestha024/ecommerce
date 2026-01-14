import { useGetCustomerReport } from "@/hooks/customer/useGetCustomerReport";
import { Card } from "../Card/Card";
import { AreaChart } from "../Charts/AreaChart";
import type { ChartType } from "../Dashboard/DashboardChart";

export const CustomerChart = () => {
  const customerData = useGetCustomerReport("lastweek");
  const data: ChartType[] =
    customerData?.data?.map((val) => ({
      xAxis: new Date(val.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      }),
      yAxis: val.totalRegistrations,
    })) ?? [];
  return (
    <Card className="w-full">
      <AreaChart data={data} name="New Customer" />
    </Card>
  );
};

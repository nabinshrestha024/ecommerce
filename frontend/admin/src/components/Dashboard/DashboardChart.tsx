import { useGetOverview } from "@/hooks/report/useGetOverview";
import { Card } from "../Card/Card";
import { AreaChart } from "../Charts/AreaChart";

export interface ChartType {
  xAxis: string;
  yAxis: number;
}

export const DashboardChart = () => {
  const last7Days: string[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();
  const sales = useGetOverview(last7Days[0], last7Days[6]);
  const data: ChartType[] =
    last7Days.map((val) => ({
      xAxis: val,
      yAxis: sales.data
        ? (sales?.data.find((value) => value.date.split("T")[0] === val)
            ?.totalSales ?? 0)
        : 0,
    })) ?? [];

  return (
    <Card className="w-full space-y-1">
      <div className="text-[18px] font-bold font-sans text-center">
        Sales Data
      </div>
      <AreaChart data={data} />
    </Card>
  );
};

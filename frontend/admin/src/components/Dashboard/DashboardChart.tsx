import { useGetOverview } from "@/hooks/report/useGetOverview";
import { Card } from "../Card/Card";
import { AreaChart } from "../Charts/AreaChart";
import { useEffect, useState } from "react";

export interface ChartType {
  xAxis: string;
  yAxis: number;
}

export const DashboardChart = () => {
  const [weeklyDetails, setWeeklyDetails] = useState("lastweek");
  const sales = useGetOverview(weeklyDetails);
  useEffect(() => {
    sales.refetch();
  }, [weeklyDetails]);
  const data: ChartType[] =
    sales?.data?.map((val) => ({
      xAxis: new Date(val.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      }),
      yAxis: val.totalSales,
    })) ?? [];

  return (
    <Card className="w-full space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-bold font-sans text-center">
          Sales Data
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-full max-w-[178px] flex justify-around items-center rounded-xl p-1 bg-[#EAF8E7] ">
            <button
              onClick={() => setWeeklyDetails("lastweek")}
              className={` px-2 py-3 text-[14px] leading-3 bg-[#EAF8E7] cursor-pointer ${
                weeklyDetails === "lastweek"
                  ? "bg-white text-[#4EA674] font-medium rounded-lg "
                  : "bg-transparent text-[#6A717F]"
              }`}
            >
              Last Week
            </button>
            <button
              onClick={() => setWeeklyDetails("lastmonth")}
              className={` px-2 py-3 text-[14px] leading-3 bg-[#EAF8E7] cursor-pointer ${
                weeklyDetails === "lastmonth"
                  ? "bg-white text-[#4EA674] font-medium rounded-lg "
                  : "bg-transparent text-[#6A717F] "
              }`}
            >
              Last Month
            </button>
          </div>
        </div>
      </div>
      <AreaChart data={data} name="Sales" />
    </Card>
  );
};

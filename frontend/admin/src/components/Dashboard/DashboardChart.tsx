import { Card } from "../Card/Card";
import { AreaChart } from "../Charts/AreaChart";

const data = [
  { xAxis: "Sunday", yAxis: 4000 },
  { xAxis: "Monday", yAxis: 3000 },
  { xAxis: "Tuesday", yAxis: 2000 },
  { xAxis: "Wednesday", yAxis: 2780 },
  { xAxis: "Thursday", yAxis: 1890 },
  { xAxis: "Friday", yAxis: 2390 },
  { xAxis: "Saturday", yAxis: 3490 },
];

export const DashboardChart = () => {
  return (
    <Card className="w-full">
      <AreaChart data={data} />
    </Card>
  );
};

import { Card } from "../Card/Card";
import { AreaChart } from "../Charts/AreaChart";

const data = [
  { xAxis: "Sun", yAxis: 3500 },
  { xAxis: "Mon", yAxis: 2500 },
  { xAxis: "Tue", yAxis: 2000 },
  { xAxis: "Wed", yAxis: 2380 },
  { xAxis: "Thurs", yAxis: 1890 },
  { xAxis: "Fri", yAxis: 2390 },
  { xAxis: "Sat", yAxis: 3490 },
];

export const CustomerLastWeekChart = () => {
  return (
    <Card className="w-full">
      <AreaChart data={data} />
    </Card>
  );
};

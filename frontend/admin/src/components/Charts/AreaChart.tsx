import {
  AreaChart as Root,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataType {
  xAxis: string;
  yAxis: number;
}

export const AreaChart = ({ data }: { data: DataType[] }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <Root data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xAxis" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="yAxis"
            stroke="#4EA674"
            fill="#4EA674"
          />
        </Root>
      </ResponsiveContainer>
    </div>
  );
};

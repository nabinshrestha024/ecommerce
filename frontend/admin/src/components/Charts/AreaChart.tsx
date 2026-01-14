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

const formatYAxis = (value: number): string => {
  if (value >= 1_00_00_000) {
    return `${(value / 1_00_00_000).toFixed(1)} Cr`;
  }
  if (value >= 1_00_000) {
    return `${(value / 1_00_000).toFixed(1)} L`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)} K`;
  }
  return value.toString();
};

export const AreaChart = ({ data }: { data: DataType[] }) => {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <Root data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xAxis" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value) => formatYAxis(Number(value))} />
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

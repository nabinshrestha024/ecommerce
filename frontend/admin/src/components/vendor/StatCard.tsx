import { Card } from "../Card/Card";

const StatCard = ({
  value,
  label,
  color,
}: {
  value?: number;
  label: string;
  color: string;
}) => (
  <Card
    className="p-0"
    cardClassName="flex flex-col px-3 py-3 border border-[#D1D5DB] rounded-sm shadow-none"
  >
    <div className="flex flex-col gap-2">
      <div className="text-center text-[18px] font-bold ">{value ?? 0}</div>
      <div className="text-center text-[14px] font-normal" style={{ color }}>
        {label}
      </div>
    </div>
  </Card>
);
export default StatCard;

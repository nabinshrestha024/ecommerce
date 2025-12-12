import { Card } from "../Card/Card";
import { BsThreeDotsVertical } from "react-icons/bs";

export const OrderDashboard = () => {
  const data = [
    {
      heading: "Total Orders",
      description: "1,240",
      time: "Last 7 days",
    },
    {
      heading: "New Orders",
      description: "240",
      time: "Last 7 days",
    },
    {
      heading: "Completed Orders",
      description: "960",
      time: "Last 7 days",
    },
    {
      heading: "Canceled Orders",
      description: "87",
      time: "Last 7 days",
    },
  ];
  return (
    <div className="space-y-4">
      <h1 className="font-bold">Order List</h1>
      <div className="grid grid-cols-2 gap-4 lg:flex">
        {data.map((val) => (
          <div className="w-full" key={val.heading}>
            <Card cardClassName="p-0" className="p-3">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-bold text-[13px]">{val.heading}</h1>
                  <div>
                    <h2 className="font-bold text-2xl">{val.description}</h2>
                    <p className="text-gray-600 text-sm">{val.time}</p>
                  </div>
                </div>
                <BsThreeDotsVertical />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

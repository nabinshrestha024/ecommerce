import { Card } from "../Card/Card";
import { BsThreeDotsVertical } from "react-icons/bs";

export const TransactionDashboard = () => {
  const data = [
    {
      heading: "Total Revenue",
      description: "$15,045",
      time: "Last 7 days",
    },
    {
      heading: "Completed Transactions",
      description: "3,150",
      time: "Last 7 days",
    },
    {
      heading: "Pending Transactions",
      description: "150",
      time: "Last 7 days",
    },
    {
      heading: "Failed Transactions",
      description: "75",
      time: "Last 7 days",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
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

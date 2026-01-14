import { GoTag } from "react-icons/go";
import { Card } from "../Card/Card";
import { useGetOrderReport } from "@/hooks/orderreport/useGetOrderReport";

export const OrderDashboard = () => {
  const orderdata = useGetOrderReport();
  console.log(orderdata.data?.totalOrders);
  const data = [
    {
      heading: "Total Orders",
      description: String(orderdata.data?.totalOrders || 0),
      time: "Last 7 days",
    },
    {
      heading: "Pending Orders",
      description: String(orderdata.data?.pending || 0),
      time: "Last 7 days",
    },
    {
      heading: "Delivered Orders",
      description: String(orderdata.data?.delivered || 0),
      time: "Last 7 days",
    },
    {
      heading: "Canceled Orders",
      description: String(orderdata.data?.canceled || 0),
      time: "Last 7 days",
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GoTag className="text-[#4EA674]" />
            Order Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Control every order, effortlessly.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:flex">
        {data.map((val) => (
          <div className="w-full " key={val.heading}>
            <Card cardClassName="p-0" className="p-4">
              <div className="flex flex-col gap-4">
                <div className="text-[18px] font-bold leading-[26px] text-[#23272E]">
                  {val.heading}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-[32px] font-bold leading-[34px] text-[#023337]">
                    {val.description}
                  </div>
                  <div className="text-[#6A717F] text-[14px] font-normal">
                    {val.time}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

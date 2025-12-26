import { useGetOverview } from "@/hooks/report/useGetOverview";
import { CardComponent } from "./CardComponent";

export const DashboardStats = () => {
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const startDate = formatDate(sevenDaysAgo);
  const endDate = formatDate(new Date());
  const data = useGetOverview(startDate, endDate);
  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 w-full lg:gap-5 mt-5 ">
      <CardComponent title="Total Sales">
        <>
          <div className="text-3xl font-semibold mt-5">
            ${data.data?.[0]?.totalSales}
          </div>
          <div className="mt-3 text-sm text-gray-500 font-medium">
            Previous 7days{" "}
            <span className="text-blue-500">
              (${data.data?.[0]?.totalSales})
            </span>
          </div>
        </>
      </CardComponent>

      <CardComponent title="Total Orders">
        <>
          <div className="text-3xl font-semibold mt-5">
            {data.data?.[0]?.totalOrders}
          </div>
          <div className="mt-3 text-sm text-gray-500 font-medium">
            Previous 7days{" "}
            <span className="text-blue-500">{data.data?.[0]?.totalOrders}</span>
          </div>
        </>
      </CardComponent>

      <CardComponent title="Pending & Canceled">
        <div className="grid grid-cols-2 gap-2 lg:gap-5 mt-5 mb-1">
          <div>
            <div className="text-[14px] lg:text-lg font-semibold">Pending</div>
            <div className="text-[16px] lg:text-2xl font-semibold text-green-500">
              509
            </div>
          </div>
          <div>
            <div className="text-[14px] lg:text-lg font-semibold">Canceled</div>
            <div className="text-[16px] lg:text-2xl font-semibold text-red-500">
              94
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  );
};

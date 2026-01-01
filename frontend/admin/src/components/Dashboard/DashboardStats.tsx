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

  const totalSales =
    data?.data?.reduce((sum, val) => sum + val.totalSales, 0) ?? 0;
  const totalOrders =
    data?.data?.reduce((sum, val) => sum + val.totalOrders, 0) ?? 0;

  const todaysOrders =
    data?.data?.find(
      (val) =>
        val.date.split("T")[0] === new Date().toISOString().split("T")[0],
    )?.totalOrders ?? 0;
  const todaysSales =
    data?.data?.find(
      (val) =>
        val.date.split("T")[0] === new Date().toISOString().split("T")[0],
    )?.totalSales ?? 0;
  return (
    <div className="grid grid-cols-2 gap-2.5 w-full lg:gap-5 mt-5 ">
      <CardComponent title="Total Sales">
        <>
          <div className="text-3xl font-semibold mt-5">Rs. {totalSales}</div>
          <div className="mt-3 text-sm text-gray-500 font-medium">
            Today <span className="text-blue-500">(Rs. {todaysSales})</span>
          </div>
        </>
      </CardComponent>

      <CardComponent title="Total Orders">
        <>
          <div className="text-3xl font-semibold mt-5">{totalOrders}</div>
          <div className="mt-3 text-sm text-gray-500 font-medium">
            Today <span className="text-blue-500">{todaysOrders}</span>
          </div>
        </>
      </CardComponent>
    </div>
  );
};

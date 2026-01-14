import { useGetOverview } from "@/hooks/report/useGetOverview";
import { CardComponent } from "./CardComponent";

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "NPR",
});

export const DashboardStats = () => {
  const data = useGetOverview("lastweek");

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
    <div className="grid grid-cols-3 gap-2.5 w-full lg:gap-5 mt-5 ">
      <CardComponent title="Total Sales">
        <>
          <div className="text-3xl font-semibold mt-2">
            {currencyFormatter.format(totalSales)}
          </div>
          <div className="text-sm text-gray-500 font-medium mt-2">
            Today{" "}
            <span className="text-blue-500">
              {currencyFormatter.format(todaysSales)}
            </span>
          </div>
        </>
      </CardComponent>

      <CardComponent title="Total Orders">
        <>
          <div className="text-3xl font-semibold mt-2">{totalOrders}</div>
          <div className="text-sm text-gray-500 font-medium mt-2">
            Today <span className="text-blue-500">{todaysOrders}</span>
          </div>
        </>
      </CardComponent>
      <CardComponent title="Pending & Cancelled">
        <div className="grid grid-cols-2 w-full items-start px-2 mt-2">
          <div className="text-[18px] font-medium flex flex-col mt-2">
            Pending{" "}
            <span className="text-blue-500 text-2xl">{todaysOrders}</span>
          </div>
          <div className="text-[18px] font-medium flex flex-col mt-2 border-l-2 border-l-gray-200 pl-4">
            Cancelled{" "}
            <span className="text-red-500 text-2xl">{todaysOrders}</span>
          </div>
        </div>
      </CardComponent>
    </div>
  );
};

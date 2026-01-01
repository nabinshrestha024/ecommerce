import { Card } from "../Card/Card";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "../Table/Table";
import { useFetchOrder, type OrderData } from "@/hooks/order/useFetchOrder";

const recentProducts = [
  {
    image: "/profile.webp",
    name: "Man",
    id: "#MAN-2025",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    id: "#MAN-2025",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    id: "#MAN-2025",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    id: "#MAN-2025",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    id: "#MAN-2025",
    price: "$500",
  },
];

export const DashboardTransaction = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const orders = useFetchOrder(pagination.pageIndex + 1);
  const columnHelper = createColumnHelper<OrderData>();
  const columns = [
    columnHelper.accessor("orderId", { header: "Order ID" }),
    columnHelper.accessor("userId", { header: "Customer ID" }),
    columnHelper.accessor("orderDate", {
      header: "Order Date",
      cell: (info) => {
        return <div>{String(info.getValue()).split("T")[0]}</div>;
      },
    }),
    columnHelper.accessor("paymentStatus", {
      header: "Payment Status",
      cell: (info) => {
        return (
          <div className="flex justify-center items-center">
            <div className="flex gap-2 items-center w-25">
              <div
                className={`h-2 w-2 rounded-full ${info.getValue() === "Paid" ? "bg-green-500" : "bg-yellow-500"}`}
              ></div>
              <div
                className={`${info.getValue() === "Paid" ? "text-green-500" : "text-yellow-500"}`}
              >
                {info.getValue()}
              </div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("totalAmount", {
      header: "Amount",
      cell: (info) => {
        return <div>Rs. {info.getValue()}</div>;
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data: orders.data?.items.slice(0, 5) || [],
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] gap-5 pr-5">
      <Card>
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-semibold">Last 7 Orders</div>
          </div>
          <Table
            table={table}
            pageIndex={pagination.pageIndex}
            showPagination={false}
          />
        </div>
      </Card>
      <Card>
        <div className="space-y-5">
          <div className="text-xl font-semibold">Recent Products</div>
          <div className="flex flex-col gap-4">
            {recentProducts.map((val, index) => {
              if (index < 5) {
                return (
                  <div className="grid grid-cols-[1fr_3fr_1fr] gap-2 items-center">
                    <div className="h-10 w-10 ">
                      <img
                        src={val.image}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{val.name}</div>
                      <div className="text-xs text-gray-500 ">{val.id}</div>
                    </div>
                    <div className="text-lg font-semibold">{val.price}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

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
import { useFetchProduct } from "@/hooks/product/useFetchProducts";

export const DashboardTransaction = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data } = useFetchProduct();
  const orders = useFetchOrder(pagination.pageIndex + 1, pagination.pageSize);
  const columnHelper = createColumnHelper<OrderData>();
  const columns = [
    columnHelper.accessor("orderId", {
      header: () => <div className="flex justify-start">Order ID</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("userId", {
      header: () => <div className="flex justify-start">Customer ID</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("orderDate", {
      header: () => <div className="flex justify-start">Order Date</div>,
      cell: (info) => {
        return (
          <div className="text-left">
            {String(info.getValue()).split("T")[0]}
          </div>
        );
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
      header: () => <div className="flex justify-end">Amount</div>,
      cell: (info) => {
        return <div className="text-right">{info.getValue()}</div>;
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data: orders.data?.items.slice(0, 7) || [],
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5 pr-5">
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
            {data?.items
              ?.filter((item) => item.stockQuantity ?? 0 > 0)
              .map((val, index) => {
                if (index < 4) {
                  return (
                    <div className="grid grid-cols-[1fr_2fr_1fr] gap-1.5 items-start border-b border-b-gray-200 pb-2">
                      <div className="h-15 w-15 ">
                        <img
                          src={val.primaryImageUrl}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{val.name}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {val.shortDescription}
                        </div>
                      </div>
                      <div className="text-md font-semibold text-right">
                        {val.price}
                      </div>
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

import { Button } from "@/ui/button";
import { Card } from "../Card/Card";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "../Table/Table";
import { IoFilter, IoSearch } from "react-icons/io5";
import { Input } from "@/ui/input";

const data = [
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Pending",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Pending",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
  {
    no: 1,
    id: "#6545",
    orderDate: "2025-10-20",
    status: "Paid",
    amount: "$500",
  },
];

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

interface DataType {
  no: number;
  id: string;
  orderDate: string;
  status: string;
  amount: string;
}

export const DashboardTransaction = () => {
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("no", { header: "No." }),
    columnHelper.accessor("id", { header: "Id Customer" }),
    columnHelper.accessor("orderDate", { header: "Order Date" }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        return (
          <div className="flex justify-center items-center">
            <div className="flex gap-2 items-center w-20">
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
    columnHelper.accessor("amount", { header: "Amount" }),
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    columns,
    data,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  return (
    <div className="grid grid-cols-[80%_20%] gap-5 pr-5">
      <Card>
        <div>
          <div className="flex justify-between">
            <div className="text-xl font-semibold">Transactions</div>
            <Button>
              Filter <IoFilter />
            </Button>
          </div>
          <Table table={table} pageIndex={pagination.pageIndex} />
        </div>
      </Card>
      <Card>
        <div className="space-y-5">
          <div className="text-xl font-semibold">Recent Products</div>
          <div className="relative">
            <Input placeholder="Search" className="pl-9" />
            <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-xl" />
          </div>
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

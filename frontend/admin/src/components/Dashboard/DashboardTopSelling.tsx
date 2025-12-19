import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "../Card/Card";
import { useState } from "react";
import { Button } from "@/ui/button";
import { IoFilter } from "react-icons/io5";
import { Table } from "../Table/Table";
import { Link } from "react-router-dom";

const data = [
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock Out",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock Out",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
  {
    image: "/profile.webp",
    name: "Man",
    totalOrder: 100,
    status: "Stock",
    price: "$500",
  },
];

interface DataType {
  image: string;
  name: string;
  totalOrder: number;
  status: string;
  price: string;
}

export const DashboardTopSelling = () => {
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Product",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex items-center justify-center">
            <div className="flex gap-2">
              <div className="h-10 w-10">
                <img
                  src={original.image}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>{original.name}</div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("totalOrder", { header: "Total Order" }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        return (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 w-22">
              <div
                className={`h-2 w-2 rounded-full ${info.getValue() === "Stock" ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <div
                className={`${info.getValue() === "Stock" ? "text-green-500" : "text-red-500"}`}
              >
                {info.getValue()}
              </div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("price", { header: "Price" }),
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
    <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5">
      <Card cardClassName="px-4" className="px-0">
        <div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Best Selling Products</div>
            <Button>
              Filter <IoFilter />
            </Button>
          </div>
          <Table table={table} pageIndex={pagination.pageIndex} />
        </div>
      </Card>

      <div>
        <Card>
          <div className="flex justify-between items-center">
            <div className="text-[14px] lg:text-xl font-semibold">
              Add new product
            </div>
            <Button>
              <Link to={"/product-management"}>+ Add Product</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

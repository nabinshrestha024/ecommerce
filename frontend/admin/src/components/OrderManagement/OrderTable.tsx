import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { data } from "./orderData.import";
import { LuBus, LuArrowDownUp } from "react-icons/lu";
import { Tabs } from "../Tabs/Tabs";
import { useState, useMemo } from "react";
import { Input } from "@/ui/input";
import { DropDown } from "../DropDown/DropDown";
import { IoFilter } from "react-icons/io5";

interface OrderType {
  no: string;
  order_id: string;
  product: string;
  date: string;
  price: string;
  payment: string;
  status: string;
  src: string;
}

const status = {
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  PENDING: "Pending",
  SHIPPED: "Shipped",
};

export const OrderTable = () => {
  const [sortType, setSortType] = useState<"date" | "price" | null>(null);
  const columnHelper = createColumnHelper<OrderType>();
  const columns = [
    columnHelper.accessor("no", { header: "No." }),
    columnHelper.accessor("order_id", { header: "Order Id" }),
    columnHelper.accessor("product", {
      header: "Product",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex items-center justify-start gap-3">
            <div className="w-7 h-7">
              <img src={original.src} alt="Image" />
            </div>
            <div>{original.product}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("date", { header: "Date" }),
    columnHelper.accessor("price", { header: "Price" }),
    columnHelper.accessor("payment", {
      header: "Payment",
      cell: (info) => {
        return info.getValue() === "Paid" ? (
          <div className="flex justify-center items-center">
            <div className="text-green-500 flex items-center justify-start gap-3 w-18">
              <div className="rounded-full h-2 w-2 bg-green-500"></div> Paid
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="text-red-500 flex items-center justify-start gap-3 w-18">
              <div className="rounded-full h-2 w-2 bg-red-500"></div> Unpaid
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const original = row.original;
        return original.status === status.DELIVERED ? (
          <div className="flex justify-center items-center">
            <div className="text-green-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "green" }} />
              Delivered
            </div>
          </div>
        ) : original.status === status.PENDING ? (
          <div className="flex justify-center items-center">
            <div className="text-orange-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "orange" }} />
              Pending
            </div>
          </div>
        ) : original.status === status.SHIPPED ? (
          <div className="flex justify-center items-center">
            <div className="text-gray-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "gray" }} />
              Shipped
            </div>
          </div>
        ) : original.status === status.CANCELLED ? (
          <div className="flex justify-center items-center">
            <div className="text-red-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "red" }} />
              Cancelled
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="text-red-500 flex items-center justify-start gap-3">
              Error
            </div>
          </div>
        );
      },
    }),
  ];
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginationDelivered, setPaginationDelivered] =
    useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [paginationPending, setPaginationPending] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginationShipped, setPaginationShipped] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginationCancelled, setPaginationCancelled] =
    useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    const filterBySearch = (orders: OrderType[]) => {
      if (!searchTerm) return orders;
      return orders.filter(
        (order) =>
          order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    };
    const sortOrder = (orders: OrderType[]) => {
      if (sortType === "date") {
        return [...orders].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      }
      if (sortType === "price") {
        return [...orders].sort((a, b) => Number(a.price) - Number(b.price));
      }
      return orders;
    };

    return {
      all: sortOrder(filterBySearch(data)),
      delivered: sortOrder(
        filterBySearch(data.filter((d) => d.status === status.DELIVERED)),
      ),
      pending: sortOrder(
        filterBySearch(data.filter((d) => d.status === status.PENDING)),
      ),
      shipped: sortOrder(
        filterBySearch(data.filter((d) => d.status === status.SHIPPED)),
      ),
      cancelled: sortOrder(
        filterBySearch(data.filter((d) => d.status === status.CANCELLED)),
      ),
    };
  }, [searchTerm, sortType]);

  const tableAll = useReactTable({
    columns,
    data: filteredData.all,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const tableDelivered = useReactTable({
    columns,
    data: filteredData.delivered,
    state: { pagination: paginationDelivered },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationDelivered,
  });

  const tablePending = useReactTable({
    columns,
    data: filteredData.pending,
    state: { pagination: paginationPending },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationPending,
  });

  const tableShipped = useReactTable({
    columns,
    data: filteredData.shipped,
    state: { pagination: paginationShipped },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationShipped,
  });

  const tableCancelled = useReactTable({
    columns,
    data: filteredData.cancelled,
    state: { pagination: paginationCancelled },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationCancelled,
  });

  const tabsData = [
    {
      id: 1,
      value: "All",
      triggerText: "All Orders",
      content: <Table table={tableAll} pageIndex={pagination.pageIndex} />,
    },
    {
      id: 2,
      value: "Delivered",
      triggerText: "Delivered",
      content: (
        <Table
          table={tableDelivered}
          pageIndex={paginationDelivered.pageIndex}
        />
      ),
    },
    {
      id: 3,
      value: "Pending",
      triggerText: "Pending",
      content: (
        <Table table={tablePending} pageIndex={paginationPending.pageIndex} />
      ),
    },
    {
      id: 4,
      value: "Shipped",
      triggerText: "Shipped",
      content: (
        <Table table={tableShipped} pageIndex={paginationShipped.pageIndex} />
      ),
    },
    {
      id: 5,
      value: "Cancelled",
      triggerText: "Cancelled",
      content: (
        <Table
          table={tableCancelled}
          pageIndex={paginationCancelled.pageIndex}
        />
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-3 rounded-lg">
      <div className="relative">
        <Tabs
          defaultValue="All"
          data={tabsData}
          tabsListClassName="bg-[#EAF8E7] flex dark:bg-accent"
        />
        <div className="absolute top-0 right-0 w-70 flex gap-2 justify-end items-center">
          <Input
            onChange={handleChange}
            type="text"
            placeholder="Search for order..."
          />
          <div className="p-2 rounded-lg border shadow-2xl">
            <DropDown
              trigger={
                <div>
                  <IoFilter className="text-[#4B5563] text-[20px]" />
                </div>
              }
              className="p-2 flex flex-col gap-2"
            >
              <div
                className="cursor-pointer hover:text-green-600"
                onClick={() => {
                  setSortType("date");
                }}
              >
                Sort by Date
              </div>
              <div
                className="cursor-pointer hover:text-green-600"
                onClick={() => {
                  setSortType("price");
                }}
              >
                Sort by Price
              </div>
            </DropDown>
          </div>
          <div className="p-2 rounded-lg border shadow-2xl">
            <DropDown
              trigger={<LuArrowDownUp />}
              className="p-2 flex flex-col gap-2"
            >
              <div>Ascending</div>
              <div>Descending</div>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  );
};

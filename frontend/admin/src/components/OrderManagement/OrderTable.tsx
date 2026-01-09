import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { LuBus } from "react-icons/lu";
import { Tabs } from "../Tabs/Tabs";
import { useState, useMemo } from "react";
import { Input } from "@/ui/input";
import { DropDown } from "../DropDown/DropDown";
import { IoFilter } from "react-icons/io5";
import { useFetchOrder, type OrderData } from "@/hooks/order/useFetchOrder";
import { OrderDetails } from "./OrderDetails";

const statusType = {
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  PENDING: "Pending",
  SHIPPED: "Shipped",
};

export const OrderTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const orders = useFetchOrder(pagination.pageIndex + 1);
  const [sortType, setSortType] = useState<"date" | "price" | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const handleRowClick = (row: OrderData) => {
    if (selectedOrder?.orderId === row.orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(row);
    }
  };

  const columnHelper = createColumnHelper<OrderData>();
  const columns = [
    columnHelper.accessor("orderId", { header: "Order Id" }),
    columnHelper.accessor(
      (row) => row.items?.map((item) => item.productName).join(", "),
      {
        id: "productName",
        header: "Product Name",
        cell: (info) => (
          <div className="flex justify-center">
            <div
              className="flex flex-col items-start w-[250px] overflow-hidden "
              onClick={() => handleRowClick(info.row.original)}
            >
              {info
                .getValue()
                ?.split(", ")
                .map((name, i) => (
                  <span
                    key={i}
                    className="block w-full line-clamp-2 break-all truncate "
                  >
                    {name}
                  </span>
                ))}
            </div>
          </div>
        ),
      },
    ),
    columnHelper.accessor("orderDate", {
      header: "Date",
      cell: (info) => <div>{info.getValue().toString().split("T")[0]}</div>,
    }),
    columnHelper.accessor("totalAmount", {
      header: "Price",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    }),
    columnHelper.accessor("paymentStatus", {
      header: "Payment",
      cell: (info) => {
        return info.getValue() === "Paid" ? (
          <div
            className="flex justify-center items-center"
            onClick={() => handleRowClick(info.row.original)}
          >
            <div className="text-green-500 flex items-center justify-start gap-3 w-20">
              <div className="rounded-full h-2 w-2 bg-green-500"></div>
              {info.getValue()}
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center"
            onClick={() => handleRowClick(info.row.original)}
          >
            <div className="text-amber-500 flex items-center justify-start gap-3 w-20">
              <div className="rounded-full h-2 w-2 bg-amber-500"></div>
              {info.getValue()}
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const original = row.original;
        return original.status === statusType.DELIVERED ? (
          <div
            className="flex justify-center items-center"
            onClick={() => handleRowClick(row.original)}
          >
            <div className="text-green-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "green" }} />
              Delivered
            </div>
          </div>
        ) : original.status === statusType.PENDING ? (
          <div
            className="flex justify-center items-center"
            onClick={() => handleRowClick(row.original)}
          >
            <div className="text-orange-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "orange" }} />
              Pending
            </div>
          </div>
        ) : original.status === statusType.SHIPPED ? (
          <div
            className="flex justify-center items-center"
            onClick={() => handleRowClick(row.original)}
          >
            <div className="text-gray-500 flex items-center justify-start gap-3 w-24">
              <LuBus style={{ color: "gray" }} />
              Shipped
            </div>
          </div>
        ) : (
          original.status === statusType.CANCELLED && (
            <div
              className="flex justify-center items-center"
              onClick={() => handleRowClick(row.original)}
            >
              <div className="text-red-500 flex items-center justify-start gap-3 w-24">
                <LuBus style={{ color: "red" }} />
                Cancelled
              </div>
            </div>
          )
        );
      },
    }),
  ];

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
    const term = searchTerm.trim().toLowerCase();
    const filterBySearch = (orders: OrderData[]) => {
      if (!term) return orders;
      return orders.filter((order) => {
        const idStr = (order.orderId ?? "").toString().toLowerCase();
        const productNames = (order.items ?? [])
          .map((it) => it.productName ?? "")
          .join(" ")
          .toLowerCase();
        const paymentStatus = (order.paymentStatus ?? "").toLowerCase();
        const status = (order.status ?? "").toLowerCase();
        return (
          idStr.includes(term) ||
          productNames.includes(term) ||
          paymentStatus.includes(term) ||
          status.includes(term)
        );
      });
    };

    const sortOrder = (orders: OrderData[]) => {
      if (sortType === "date") {
        return [...orders].sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
        );
      }
      if (sortType === "price") {
        return [...orders].sort(
          (a, b) => Number(a.totalAmount) - Number(b.totalAmount),
        );
      }
      return orders;
    };

    const items = (orders.data?.items ?? []) as OrderData[];

    return {
      all: sortOrder(filterBySearch(items)),
      delivered: sortOrder(
        filterBySearch(items.filter((d) => d.status === statusType.DELIVERED)),
      ),
      pending: sortOrder(
        filterBySearch(items.filter((d) => d.status === statusType.PENDING)),
      ),
      shipped: sortOrder(
        filterBySearch(items.filter((d) => d.status === statusType.SHIPPED)),
      ),
      cancelled: sortOrder(
        filterBySearch(items.filter((d) => d.status === statusType.CANCELLED)),
      ),
    };
  }, [searchTerm, sortType, orders]);

  const tableAll = useReactTable({
    columns,
    data: filteredData.all,
    state: { pagination },
    pageCount: Math.ceil((orders.data?.totalCount ?? 0) / pagination.pageSize),
    manualPagination: true,
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
    <div className="flex p-2 rounded-lg w-full gap-5">
      <div className="flex-1 relative hover:cursor-pointer">
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
        </div>
      </div>
      {selectedOrder && (
        <div className="w-[350px] mt-5">
          <OrderDetails order={selectedOrder} setOrder={setSelectedOrder} />
        </div>
      )}
    </div>
  );
};

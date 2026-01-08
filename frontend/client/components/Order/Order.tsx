"use client";
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
import { useOrder } from "@/hooks/orders/useOrder";
import { OrderDetails } from "./OrderDetails";

const statusType = {
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  PENDING: "Pending",
  SHIPPED: "Shipped",
  PAID: "Paid",
};

type Product = {
  orderItemId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  productDescription: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderData = {
  items: Product[];
  orderId: number;
  userId: number;
  orderDate: number;
  shippingCity: string;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethodId: string;
  paymentGateway: string;
  notes: string;
  attributes: AttributeType[];
};

export interface AttributeType {
  name: string;
  value: string;
}

export const Order = () => {
  const { data } = useOrder();

  const [sortType, setSortType] = useState<"date" | "price" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const handleRowClick = (row: OrderData) => {
    if (selectedOrder?.orderId === row.orderId) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(row);
    }
  };

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

  const columnHelper = createColumnHelper<OrderData>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("orderId", {
        header: "Order Id",
        cell: (info) => (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="font-bold cursor-pointer"
          >
            #{info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("shippingCity", {
        header: "Shipping City",
        cell: (info) => (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="cursor-pointer"
          >
            {info.getValue() || "N/A"}
          </div>
        ),
      }),
      columnHelper.accessor("orderDate", {
        header: "Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor("totalAmount", {
        header: "Price",
        cell: (info) => (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="cursor-pointer"
          >
            Rs. {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("paymentStatus", {
        header: "Payment",
        cell: (info) => {
          const isPaid = info.getValue() === "Paid";
          const isProcessing = info.getValue() === "Processing";

          let color = "text-red-500";
          let bg = "bg-red-500";

          if (isPaid) {
            color = "text-green-500 ";
            bg = "bg-green-500";
          }
          if (isProcessing) {
            color = "text-blue-500";
            bg = "bg-blue-500";
          }

          return (
            <div
              className="flex justify-center items-center"
              onClick={() => handleRowClick(info.row.original)}
            >
              <div
                className={`${color} flex items-center justify-start gap-3 w-24`}
              >
                <div className={`rounded-full h-2 w-2 ${bg}`}></div>
                {info.getValue()}
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          let colorClass = "text-gray-500";
          let iconColor = "gray";

          if (status === statusType.DELIVERED || status === "Paid") {
            colorClass = "text-green-500";
            iconColor = "green";
          } else if (status === statusType.PENDING || status === "Processing") {
            colorClass = "text-orange-500";
            iconColor = "orange";
          } else if (status === statusType.CANCELLED) {
            colorClass = "text-red-500";
            iconColor = "red";
          }

          return (
            <div className="flex justify-center items-center">
              <div
                className={`${colorClass} flex items-center justify-start gap-3 w-24`}
              >
                <LuBus style={{ color: iconColor }} />
                {status}
              </div>
            </div>
          );
        },
      }),
    ],
    [],
  );

  const filteredData = useMemo(() => {
    const rawItems = (
      Array.isArray(data) ? data : data?.items || []
    ) as OrderData[];

    const processData = (items: OrderData[]) => {
      let result = [...items];

      if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(
          (order) =>
            (order.orderId &&
              String(order.orderId).toLowerCase().includes(lowerTerm)) ||
            (order.shippingCity &&
              order.shippingCity.toLowerCase().includes(lowerTerm)) ||
            (order.status && order.status.toLowerCase().includes(lowerTerm)) ||
            (order.items &&
              order.items.some((item) =>
                item.productName.toLowerCase().includes(lowerTerm),
              )),
        );
      }

      if (sortType === "date") {
        result.sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
        );
      } else if (sortType === "price") {
        result.sort((a, b) => Number(a.totalAmount) - Number(b.totalAmount));
      }

      return result;
    };

    const all = processData(rawItems);

    return {
      all,
      delivered: all.filter((d) => d.status === statusType.DELIVERED),
      pending: all.filter((d) => d.status === statusType.PENDING),
      shipped: all.filter((d) => d.status === statusType.SHIPPED),
      cancelled: all.filter((d) => d.status === statusType.CANCELLED),
    };
  }, [data, searchTerm, sortType]);

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

  return (
    <div className="flex flex-col lg:flex-row p-3 rounded-lg w-full gap-3 ">
      <div className="flex-1 relative">
        <Tabs
          defaultValue="All"
          data={tabsData}
          tabsListClassName="bg-[#EAF8E7] flex dark:bg-accent"
        />
        <div className="absolute top-0 right-0 w-70 flex gap-2 justify-end items-center">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for order..."
            value={searchTerm}
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
                onClick={() => setSortType("date")}
              >
                Sort by Date
              </div>
              <div
                className="cursor-pointer hover:text-green-600"
                onClick={() => setSortType("price")}
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

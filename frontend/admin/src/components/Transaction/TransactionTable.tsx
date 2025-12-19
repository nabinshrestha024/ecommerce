import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { data } from "./transactionData.import";
import { Tabs } from "../Tabs/Tabs";
import { useState, useMemo } from "react";
import { Input } from "@/ui/input";
import { DropDown } from "../DropDown/DropDown";
import { IoFilter } from "react-icons/io5";

interface TransactionType {
  no: string;
  customer_id: string;
  name: string;
  date: string;
  total: number;
  method: string;
  status: string;
}

const status = {
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  PENDING: "Pending",
};

export const TransactionTable = () => {
  const [sortType, setSortType] = useState<"date" | "total" | null>(null);
  const columnHelper = createColumnHelper<TransactionType>();
  const columns = [
    columnHelper.accessor("customer_id", { header: "Customer Id" }),
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("date", { header: "Date" }),
    columnHelper.accessor("total", { header: "Total" }),
    columnHelper.accessor("method", { header: "Method" }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        return info.getValue() === status.COMPLETED ? (
          <div className="flex justify-center items-center">
            <div className="text-green-500 flex items-center justify-start gap-3 w-25">
              <div className="rounded-full h-2 w-2 bg-green-500"></div>{" "}
              Completed
            </div>
          </div>
        ) : info.getValue() === status.CANCELLED ? (
          <div className="flex justify-center items-center">
            <div className="text-red-500 flex items-center justify-start gap-3 w-25">
              <div className="rounded-full h-2 w-2 bg-red-500"></div> Cancelled
            </div>
          </div>
        ) : info.getValue() === status.PENDING ? (
          <div className="flex justify-center items-center">
            <div className="text-gray-500 flex items-center justify-start gap-3 w-25">
              <div className="rounded-full h-2 w-2 bg-gray-500"></div> Pending
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
  const [paginationCompleted, setPaginationCompleted] =
    useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [paginationPending, setPaginationPending] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginationCancelled, setPaginationCancelled] =
    useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    const filterBySearch = (transactions: TransactionType[]) => {
      if (!searchTerm) return transactions;
      return transactions.filter(
        (transaction) =>
          transaction.customer_id
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.status.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    };

    const sortTransaction = (transaction: TransactionType[]) => {
      if (sortType === "date") {
        return [...transaction].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      }
      if (sortType === "total") {
        return [...transaction].sort(
          (a, b) => Number(a.total) - Number(b.total),
        ); // ascending order
      }
      return transaction;
    };

    return {
      all: sortTransaction(filterBySearch(data)),
      completed: sortTransaction(
        filterBySearch(data.filter((d) => d.status === status.COMPLETED)),
      ),
      pending: sortTransaction(
        filterBySearch(data.filter((d) => d.status === status.PENDING)),
      ),
      cancelled: sortTransaction(
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

  const tableCompleted = useReactTable({
    columns,
    data: filteredData.completed,
    state: { pagination: paginationCompleted },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationCompleted,
  });

  const tablePending = useReactTable({
    columns,
    data: filteredData.pending,
    state: { pagination: paginationPending },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationPending,
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
      value: "Completed",
      triggerText: "Completed",
      content: (
        <Table
          table={tableCompleted}
          pageIndex={paginationCompleted.pageIndex}
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
                  setSortType("total");
                }}
              >
                Sort by Price
              </div>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  );
};

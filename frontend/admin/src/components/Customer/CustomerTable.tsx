import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { data } from "./CustomerTable.import";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { CustomerProfile } from "../Customer/CustomerProfile.tsx";
import { Dialog } from "../Dialog/Dialog.tsx";
import { CustomerForm } from "./CustomerForm.tsx";

type Person = {
  id: string;
  name: string;
  phone: string;
  orderCount: string;
  totalSpend: string;
  status: string;
};

export const CustomerTable = () => {
  const columnHelper = createColumnHelper<Person>();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Person | null>(null);

  const handleRowClick = (row: Person) => {
    if (selectedCustomer?.id === row.id) {
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(row);
    }
  };

  const handleEdit = (row: Person) => {
    setSelectedCustomer(row);
  };

  const columns = [
    columnHelper.accessor("id", {
      header: "Customer Id",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("orderCount", {
      header: "Order Count",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("totalSpend", {
      header: "Total Spend",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();

        return (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="flex gap-3 justify-center items-center cursor-pointer"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                value === "Active" ? "bg-[#21C45D]" : "bg-[#EF4343]"
              }`}
            ></div>
            <div
              className={`${
                value === "Active" ? "text-[#21C45D]" : "text-[#EF4343]"
              }`}
            >
              {value}
            </div>
          </div>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2 justify-center items-center">
          <Dialog
            triggerContent={
              <FaEdit
                className="text-[#6A717F] text-[20px]"
                onClick={() => handleEdit(info.row.original)}
              />
            }
          >
            {selectedCustomer && <CustomerForm customer={selectedCustomer} />}
          </Dialog>
          <MdDelete className="text-[#6A717F] text-[20px]" />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex gap-4 max-lg:flex-col">
      <div className="flex-1">
        <Table table={table} pageIndex={pagination.pageIndex} />
      </div>

      {selectedCustomer && (
        <div className="w-[350px] mt-5">
          <CustomerProfile customer={selectedCustomer} />
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { type Person } from "../Customer/CustomerProfile.tsx";
import { Dialog } from "../Dialog/Dialog.tsx";
import { CustomerForm } from "./CustomerForm.tsx";
import { useUser } from "@/hooks/user/useUser.ts";
import { useDeleteUser } from "@/hooks/user/useDelete.ts";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog.tsx";

export const CustomerTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const user = useUser(pagination.pageIndex + 1, pagination.pageSize);
  const columnHelper = createColumnHelper<Person>();
  const [loading, setLoading] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Person | null>(null);

  const handleEdit = (row: Person) => {
    setSelectedCustomer(row);
  };

  const deleteUser = useDeleteUser();
  const handleDelete = (userId: number) => {
    setLoading(true);
    deleteUser.mutate(userId, {
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const columns = [
    columnHelper.accessor("userid", {
      header: () => <div className="flex justify-start">User Id</div>,
      cell: (info) => (
        <div className="cursor-pointer text-start">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("fullName", {
      header: () => <div className="flex justify-start">Name</div>,
      cell: (info) => (
        <div className="cursor-pointer text-left">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("phone", {
      header: () => <div className="flex justify-start">Phone Number</div>,
      cell: (info) => (
        <div className="cursor-pointer text-left">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("address", {
      header: () => <div className="flex justify-start">Address</div>,
      cell: (info) => (
        <div className="cursor-pointer text-left">{info.getValue() ?? "-"}</div>
      ),
    }),

    columnHelper.accessor("role", {
      header: () => <div className="flex justify-start">Role</div>,
      cell: (info) => (
        <div className="cursor-pointer text-left">
          {info.getValue() ? "Admin" : "User"}
        </div>
      ),
    }),

    columnHelper.accessor("isActive", {
      header: () => <div className="flex justify-start">Status</div>,
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="flex gap-3 items-center cursor-pointer">
            <div
              className={`w-2 h-2 rounded-full ${
                value ? "bg-[#21C45D]" : "bg-[#EF4343]"
              }`}
            ></div>
            <div className={`${value ? "text-[#21C45D]" : "text-[#EF4343]"}`}>
              {value ? "Active" : "Inactive"}
            </div>
          </div>
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: () => <div className="flex justify-start">Action</div>,
      cell: (info) => (
        <div className="flex gap-2  items-center">
          <Dialog
            triggerContent={
              <FaEdit
                className="text-[#6A717F] text-[20px] cursor-pointer"
                onClick={() => handleEdit(info.row.original)}
              />
            }
          >
            {selectedCustomer && (
              <CustomerForm
                customer={{
                  ...selectedCustomer,
                  userid: selectedCustomer.userid,
                }}
                onSave={() => {
                  setSelectedCustomer(null);
                }}
              />
            )}
          </Dialog>
          <ConfirmationDialog
            trigger={
              <button
                type="button"
                disabled={loading}
                className="p-1 disabled:cursor-not-allowed"
              >
                <MdDelete
                  className={`text-[20px] text-gray-500 cursor-pointer`}
                />
              </button>
            }
            confirmFunc={() => handleDelete(info.row.original.userid)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data: user.data?.data || [],
    state: { pagination },
    pageCount: Math.ceil((user.data?.totalCount ?? 0) / pagination.pageSize),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex gap-4 max-lg:flex-col">
      <div className="flex-1">
        <Table
          table={table}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
        />
      </div>
    </div>
  );
};

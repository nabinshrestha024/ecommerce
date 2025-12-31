import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { CustomerProfile } from "../Customer/CustomerProfile.tsx";
import { Dialog } from "../Dialog/Dialog.tsx";
import { CustomerForm } from "./CustomerForm.tsx";
import { useUser } from "@/hooks/user/useUser.ts";
import { useDeleteUser } from "@/hooks/user/useDelete.ts";

type Person = {
  userId: number;
  email: string;
  fullName: string;
  passwordHash: string;
  status: number;
  profileImageUrl: string | null;
  phone: string;
  address: string;
  city: string;
  role: boolean;
  refreshToken: string | null;
  accessToken: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userProfile: string;
  socialLinks: string;
  orders: string;
};

export const CustomerTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const user = useUser(pagination.pageIndex);
  const columnHelper = createColumnHelper<Person>();
  const [loading, setLoading] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Person | null>(null);

  const handleRowClick = (row: Person) => {
    if (selectedCustomer?.userId === row.userId) {
      setSelectedCustomer(null);
    } else {
      setSelectedCustomer(row);
    }
  };

  const handleEdit = (row: Person) => {
    setSelectedCustomer(row);
  };

  const deleteUser = useDeleteUser();
  const handleDelete = (userId: number) => {
    setLoading(true);
    deleteUser.mutate(userId, {
      onSuccess: () => {
        setLoading(false);
      },
    });
  };

  const columns = [
    columnHelper.accessor("userId", {
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

    columnHelper.accessor("fullName", {
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

    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue() ?? "-"}
        </div>
      ),
    }),

    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue() ? "Admin" : "User"}
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
            className="flex gap-3  items-center cursor-pointer"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                value === 1 ? "bg-[#21C45D]" : "bg-[#EF4343]"
              }`}
            ></div>
            <div
              className={`${value === 1 ? "text-[#21C45D]" : "text-[#EF4343]"}`}
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
            {selectedCustomer && (
              <CustomerForm
                customer={selectedCustomer}
                onSave={() => {
                  setSelectedCustomer(null);
                }}
              />
            )}
          </Dialog>
          <button
            type="button"
            onClick={() => handleDelete(info.row.original.userId)}
            disabled={loading}
            className="p-1 disabled:cursor-not-allowed"
          >
            <MdDelete
              className={`text-[20px] ${
                loading ? "text-gray-400" : "text-[#6A717F] hover:text-red-600"
              }`}
            />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    data: user.data?.data || [],
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

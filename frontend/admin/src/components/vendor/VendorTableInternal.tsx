"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { Dialog } from "../Dialog/Dialog";
import { VendorForm } from "./VendorForm";
import { mapTableToVendor } from "./types";
import type { VendorTableProps } from "./types";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

interface Props {
  data: VendorTableProps[];
  editingVendor: VendorTableProps | null;
  setEditingVendor: (v: VendorTableProps | null) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (v: boolean) => void;
  onDelete: (id: number) => void;
}

const formatDateOnly = (raw: string) =>
  raw?.includes("T") ? raw.slice(0, 10) : raw;

export const VendorTableInternal = ({
  data,
  editingVendor,
  setEditingVendor,
  isDialogOpen,
  setIsDialogOpen,
  onDelete,
}: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columnHelper = createColumnHelper<VendorTableProps>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("vendorId", {
        header: () => <span className="block text-center">Vendor ID</span>,
        cell: (info) => (
          <span className="block text-center">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("name", {
        header: () => <span className="block text-left">Company Name</span>,
        cell: (info) => (
          <span className="block text-left">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("contactPerson", {
        header: () => <span className="block text-left">Contact Person</span>,
        cell: (info) => (
          <span className="block text-left">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("email", {
        header: () => <span className="block text-left">Email</span>,
        cell: (info) => (
          <span className="block text-left">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("phone", {
        header: () => <span className="block text-left">Phone</span>,
        cell: (info) => (
          <span className="block text-left">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("address", {
        header: () => <span className="block text-left">Address</span>,
        cell: (info) => (
          <span className="block text-left">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: () => <span className="block text-left">Joined On</span>,
        cell: (info) => (
          <span className="block text-left">
            {formatDateOnly(info.getValue())}
          </span>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: () => <span className="block text-center">Actions</span>,
        cell: ({ row }) => (
          <div className="flex gap-3 justify-center">
            <Dialog
              triggerContent={<FaEdit className="cursor-pointer" />}
              open={
                isDialogOpen &&
                editingVendor?.vendorId === row.original.vendorId
              }
              onOpenChange={(open) => {
                if (open) {
                  setEditingVendor(row.original);
                  setIsDialogOpen(true);
                } else {
                  setEditingVendor(null);
                  setIsDialogOpen(false);
                }
              }}
            >
              {editingVendor && (
                <VendorForm
                  vendor={mapTableToVendor(editingVendor)}
                  onSave={() => {
                    setEditingVendor(null);
                    setIsDialogOpen(false);
                  }}
                />
              )}
            </Dialog>

            <ConfirmationDialog
              trigger={<MdDelete className="cursor-pointer" />}
              confirmFunc={() => onDelete(row.original.vendorId)}
            />
          </div>
        ),
      }),
    ],
    [
      editingVendor,
      isDialogOpen,
      columnHelper,
      onDelete,
      setEditingVendor,
      setIsDialogOpen,
    ],
  );

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <Table table={table} />;
};

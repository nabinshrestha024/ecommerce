import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { VendorData } from "./VendorData.Import.ts";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { Dialog } from "../Dialog/Dialog.tsx";
import { VendorProfile } from "./VendorProfile.tsx";
import { VendorForm } from "./VendorForm.tsx";
export interface VendorTableProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive" | "blocked";
  products: number;
  lastActive: string;
  joinedOn: string;
}

type Vendor = {
  id: string;
  businessName: string;
  name?: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "inactive" | "blocked";
  totalProducts: number;
  products?: number;
  lastActive: string;
  joinedOn: string;
  address: string;
  completedOrders?: number;
  canceledOrders?: number;
  avatar?: string;
};

const mapToVendorProfile = (vendor: VendorTableProps) => ({
  name: vendor.name,
  email: vendor.email,
  phone: vendor.phone,
  status: vendor.status,
  businessName: vendor.name,
  totalProducts: vendor.products,
  joinedOn: vendor.joinedOn,
  lastActive: vendor.lastActive,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.name)}&background=random`,
  address: "N/A",
});

const mapTableToVendor = (v: VendorTableProps): any => ({
  id: v.id,
  businessName: v.name,
  name: v.name,
  email: v.email,
  phone: v.phone,
  status: v.status,
  totalProducts: v.products,
  products: v.products,
  lastActive: v.lastActive,
  joinedOn: v.joinedOn,
  address: "N/A",
  completedOrders: 0,
  canceledOrders: 0,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(v.name)}&background=random`,
});

const mapVendorToTable = (v: Partial<Vendor> | any): VendorTableProps => ({
  id: v.id ?? "",
  name: v.businessName ?? v.name ?? "",
  email: v.email ?? "",
  phone: v.phone ?? "",
  status: v.status ?? "inactive",
  products: v.totalProducts ?? v.products ?? 0,
  lastActive: v.lastActive ?? "",
  joinedOn: v.joinedOn ?? "",
});

export const VendorTable = () => {
  const [vendor, setVendor] = useState<VendorTableProps[]>(VendorData);
  const columnHelper = createColumnHelper<VendorTableProps>();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [selectedVendor, setSelectedVendor] = useState<VendorTableProps | null>(
    null,
  );

  const handleRowClick = (row: VendorTableProps) => {
    if (selectedVendor?.id === row.id) {
      setSelectedVendor(null);
    } else {
      setSelectedVendor(row);
    }
  };

  const handleEdit = (row: VendorTableProps) => {
    setSelectedVendor(row);
  };

  const handleDelete = (id: string) => {
    setVendor((prev) => prev.filter((vendor) => vendor.id !== id));
  };

  const columns = [
    columnHelper.accessor("id", {
      header: "Vendor Id",
      cell: (info) => <div className="cursor-pointer">{info.getValue()}</div>,
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
    columnHelper.accessor("email", {
      header: "Email",
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
    columnHelper.accessor("products", {
      header: "Products",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("lastActive", {
      header: "Last Active",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer"
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("joinedOn", {
      header: "Joined On",
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
        const value = info.getValue() as string;

        const statusStyles: Record<string, { dot: string; text: string }> = {
          active: { dot: "bg-[#21C45D]", text: "text-[#21C45D]" },
          pending: { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]" },
          inactive: { dot: "bg-[#9CA3AF]", text: "text-[#9CA3AF]" },
          blocked: { dot: "bg-[#EF4343]", text: "text-[#EF4343]" },
        };

        const style = statusStyles[value] ?? statusStyles.inactive;

        return (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="flex gap-3 justify-center items-center cursor-pointer"
          >
            <div className={`w-2 h-2 rounded-full ${style.dot}`} />
            <div className={`${style.text} capitalize`}>{value}</div>
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
            {selectedVendor && (
              <VendorForm
                vendor={mapTableToVendor(selectedVendor) as any}
                onSave={(updatedVendor: any) => {
                  setVendor((prev) =>
                    prev.map((v) =>
                      v.id === updatedVendor.id
                        ? mapVendorToTable(updatedVendor)
                        : v,
                    ),
                  );
                }}
              />
            )}
          </Dialog>
          <MdDelete
            className="text-[#6A717F] text-[20px]"
            onClick={() => handleDelete(info.row.original.id)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: vendor,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <div className="text-[16px] leading-normal font-bold text-[#23272E]">
        Vendors Table
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <div className="flex-1">
          <Table table={table} pageIndex={pagination.pageIndex} />
        </div>

        {selectedVendor && (
          <div className="w-[350px] mt-5">
            <VendorProfile vendor={mapToVendorProfile(selectedVendor)} />
          </div>
        )}
      </div>
    </div>
  );
};

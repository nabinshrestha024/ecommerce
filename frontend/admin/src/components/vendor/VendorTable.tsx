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
import { VendorForm } from "./VendorForm.tsx";
export interface VendorTableProps {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  joinedOn: string;
}

type Vendor = {
  id: string;
  businessName: string;
  contactPerson?: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  totalProducts: number;
  products?: number;
  joinedOn: string;
  address: string;
  completedOrders?: number;
  canceledOrders?: number;
};

// Profile mapping removed; table no longer displays profile sidebar

const mapTableToVendor = (v: VendorTableProps): any => ({
  id: v.id,
  businessName: v.companyName,
  contactPerson: v.contactPerson,
  email: v.email,
  phone: v.phone,
  status: v.status,
  joinedOn: v.joinedOn,
  address: v.address,
});

const mapVendorToTable = (v: Partial<Vendor> | any): VendorTableProps => ({
  id: v.id ?? "",
  companyName: v.businessName ?? "",
  contactPerson: v.contactPerson ?? "",
  email: v.email ?? "",
  phone: v.phone ?? "",
  address: v.address ?? "",
  status: v.status ?? "inactive",
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
    columnHelper.accessor("companyName", {
      header: "Company Name",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer flex justify-start items-center"
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("contactPerson", {
      header: "Contact Person",
      cell: (info) => (
        <div
          onClick={() => handleRowClick(info.row.original)}
          className="cursor-pointer flex justify-start items-center"
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
          className="cursor-pointer flex justify-start items-center"
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
          inactive: { dot: "bg-[#9CA3AF]", text: "text-[#9CA3AF]" },
        };

        const style = statusStyles[value] ?? statusStyles.inactive;

        return (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="flex gap-3 justify-start items-center cursor-pointer"
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
              <div className="max-h-[70vh] overflow-y-auto px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {" "}
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
              </div>
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
      <div className="text-[16px] leading-normal font-bold ">Vendors Table</div>

      <div className="flex gap-4 max-lg:flex-col">
        <div className="flex-1">
          <Table table={table} pageIndex={pagination.pageIndex} />
        </div>
      </div>
    </div>
  );
};

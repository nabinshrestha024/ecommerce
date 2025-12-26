import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table.tsx";
import { Dialog } from "../Dialog/Dialog.tsx";
import { VendorForm } from "./VendorForm.tsx";
import { useGetVendor } from "@/hooks/vendor/useGetVendor.ts";
import { useDeleteVendor } from "@/hooks/vendor/useDeleteVendor.ts";

export interface VendorTableProps {
  vendorId: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

const mapTableToVendor = (v: VendorTableProps): any => ({
  vendorId: v.vendorId,
  businessName: v.name,
  contactPerson: v.contactPerson,
  email: v.email,
  phone: v.phone,
  address: v.address,
  status: v.isActive ? "active" : "inactive",
  joinedOn: (v.createdAt ?? "").split("T")[0],
});

export const VendorTable = () => {
  const { data, isError } = useGetVendor();
  const { mutate } = useDeleteVendor();
  const sortedVendorData: VendorTableProps[] = useMemo(() => {
    const list = Array.isArray(data?.data) ? [...data!.data] : [];
    return list.sort((a: any, b: any) => {
      const ai = Number(a.vendorId);
      const bi = Number(b.vendorId);
      if (Number.isNaN(ai) || Number.isNaN(bi)) {
        return String(a.vendorId).localeCompare(String(b.vendorId));
      }
      return ai - bi;
    });
  }, [data]);

  const columnHelper = createColumnHelper<VendorTableProps>();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [selectedVendor, setSelectedVendor] = useState<VendorTableProps | null>(
    null,
  );

  const handleRowClick = (row: VendorTableProps) => {
    if (selectedVendor?.vendorId === row.vendorId) {
      setSelectedVendor(null);
    } else {
      setSelectedVendor(row);
    }
  };

  const handleEdit = (row: VendorTableProps) => {
    setSelectedVendor(row);
  };

  const handleDelete = (vendorId: number) => {
    mutate(vendorId);
  };

  const columns = [
    columnHelper.accessor("vendorId", {
      header: "Vendor Id",
      cell: (info) => <div className="cursor-pointer">{info.getValue()}</div>,
    }),
    columnHelper.accessor("name", {
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
          className="cursor-pointer flex justify-start items-center truncate max-w-[200px]"
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
          className="cursor-pointer truncate max-w-[200px]"
        >
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Joined On",
      cell: (info) => {
        const raw = info.getValue() as string;
        const dateOnly = (raw ?? "").split("T")[0];
        return (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="cursor-pointer whitespace-nowrap"
          >
            {dateOnly}
          </div>
        );
      },
    }),
    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue() as boolean;

        const statusStyles: Record<string, { dot: string; text: string }> = {
          active: { dot: "bg-[#21C45D]", text: "text-[#21C45D]" },
          inactive: { dot: "bg-[#9CA3AF]", text: "text-[#9CA3AF]" },
        };

        const style = value ? statusStyles.active : statusStyles.inactive;

        return (
          <div
            onClick={() => handleRowClick(info.row.original)}
            className="flex gap-2 justify-start items-center cursor-pointer whitespace-nowrap"
          >
            <div className={`w-2 h-2 rounded-full ${style.dot}`} />
            <span className={style.text}>{value ? "Active" : "Inactive"}</span>
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
                className="text-[#6A717F] text-[20px] cursor-pointer hover:text-[#4A5160] transition-colors"
                onClick={() => handleEdit(info.row.original)}
              />
            }
          >
            {selectedVendor && (
              <div className="max-h-[70vh] overflow-y-auto px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <VendorForm
                  vendor={mapTableToVendor(selectedVendor) as any}
                  onSave={() => {
                    setSelectedVendor(null);
                  }}
                />
              </div>
            )}
          </Dialog>
          <MdDelete
            className="text-[#6A717F] text-[20px] cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => handleDelete(info.row.original.vendorId)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: sortedVendorData as VendorTableProps[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="w-full px-0 sm:px-4 lg:px-0">
      <div className="text-base sm:text-lg leading-normal font-bold mb-4">
        Vendors Table
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <div className="flex-1/2 overflow-x-auto">
          <Table table={table} pageIndex={pagination.pageIndex} />
          {isError && (
            <div className="text-red-500 text-center mt-4 text-sm sm:text-base">
              Failed to load vendor data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

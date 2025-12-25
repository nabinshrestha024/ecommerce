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
  isActive: v.isActive,
  createdAt: v.createdAt,
  address: v.address,
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
    columnHelper.accessor("createdAt", {
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
            className="flex gap-3 justify-start items-center cursor-pointer"
          >
            <div
              className={`w-2 h-2 rounded-full ${style.dot} ${style.text}`}
            />
            {value ? "Active" : "Inactive"}
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
                  onSave={() => {
                    setSelectedVendor(null);
                  }}
                />
              </div>
            )}
          </Dialog>
          <MdDelete
            className="text-[#6A717F] text-[20px]"
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
    <div>
      <div className="text-[16px] leading-normal font-bold ">Vendors Table</div>

      <div className="flex gap-4 max-lg:flex-col">
        <div className="flex-1">
          <Table table={table} pageIndex={pagination.pageIndex} />
          {isError && (
            <div className="text-red-500 text-center mt-4">
              Failed to load vendor data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

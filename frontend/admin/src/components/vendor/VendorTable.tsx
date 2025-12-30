import { useEffect, useMemo, useState } from "react";
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
import { Tabs } from "../Tabs/Tabs.tsx";

import { useDebounce } from "@/hooks/search/useDebounce.tsx";
import { useSearch } from "@/hooks/product/useSearch.ts";

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
  joinedOn: formatDateOnly(v.createdAt),
});

const formatDateOnly = (raw: string): string => {
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) return raw.slice(0, 10);

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  const m1 = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (m1) return `${m1[3]}-${m1[2]}-${m1[1]}`;

  const d = new Date(raw);
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return "";
};

export const VendorTable = () => {
  const { data, isError } = useGetVendor();
  const { mutate } = useDeleteVendor();

  const [searchProduct, setSearchProduct] = useState("");
  const isSearching = searchProduct.trim().length > 0;
  const debounceSearch = useDebounce(searchProduct, 500);

  useEffect(() => {
    if (!debounceSearch) return;
  }, [debounceSearch]);
  const columnHelper = createColumnHelper<VendorTableProps>();
  const pagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  const search = useSearch(debounceSearch, pagination.pageIndex);
  const [selectedVendor, setSelectedVendor] = useState<VendorTableProps | null>(
    null,
  );
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
  const tableData = useMemo(() => {
    return isSearching ? search.data?.items || [] : sortedVendorData;
  }, [isSearching, search.data?.items, sortedVendorData]);

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
        const dateOnly = formatDateOnly(raw ?? "");
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

  const tableFeature = useReactTable({
    columns,
    data: tableData as VendorTableProps[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const tableActive = useReactTable({
    columns,
    data: tableData.filter((vendor) => vendor.isActive) as VendorTableProps[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const tableInactive = useReactTable({
    columns,
    data: tableData.filter((vendor) => !vendor.isActive) as VendorTableProps[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const tabsData = [
    { name: "All Vendors", table: tableFeature },
    { name: "Active Vendors", table: tableActive },
    { name: "Inactive Vendors", table: tableInactive },
  ];
  return (
    <div className="w-full px-0 sm:px-4 lg:px-0">
      <div className="text-base sm:text-lg leading-normal font-bold mb-4">
        Vendors Table
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <div className="flex flex-col gap-4">
          <Tabs
            defaultValue="All Vendors"
            data={tabsData.map((tab, index) => ({
              id: index + 1,
              value: tab.name,
              triggerText: tab.name,
              content: (
                <Table table={tab.table} pageIndex={pagination.pageIndex} />
              ),
            }))}
            tabsListClassName="bg-[#EAF8E7] flex"
          />
          {isError && (
            <div className="text-red-600 text-center">
              Error fetching vendor data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Dialog } from "../Dialog/Dialog.tsx";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {
  useFetchBanner,
  type BannerData,
} from "@/hooks/banner/useFetchBanner.ts";
import { useDeleteBanner } from "@/hooks/banner/useDeleteBanner.ts";
import { EditBannerForm } from "./EditBannerForm.tsx";
import { Table } from "../Table/Table.tsx";

export const BannerTable = () => {
  const [open, setOpen] = useState<number | null>(null);
  const banner = useFetchBanner();
  const columnHelper = createColumnHelper<BannerData>();

  const [selectedBanner, setSelectedBanner] = useState<BannerData | null>(null);

  const handleEdit = (row: BannerData) => {
    setSelectedBanner(row);
  };

  const deleteBanner = useDeleteBanner();
  const handleDelete = (bannerId: number) => {
    deleteBanner.mutate(bannerId, {});
  };

  const columns = [
    columnHelper.accessor("bannerId", {
      header: () => <div className="flex justify-start">Banner Id</div>,
      cell: (info) => (
        <div className="cursor-pointer text-start">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("title", {
      header: () => <div className="flex justify-start">Title</div>,
      cell: (info) => (
        <div className="cursor-pointer text-left">{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("description", {
      header: () => <div className="flex justify-start">Description</div>,
      cell: (info) => (
        <div className="w-[200px] cursor-pointer text-left truncate">
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("redirectUrl", {
      header: () => <div className="flex justify-start">Redirect Url</div>,
      cell: (info) => (
        <div className="w-[200px] cursor-pointer text-left truncate">
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("imageUrl", {
      header: () => <div className="flex justify-start">Image</div>,
      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="flex justify-start cursor-pointer">
            <div
              style={{ width: 200 }}
              className="h-30 border border-[#E5E7EB] rounded-md overflow-hidden "
            >
              <img
                src={
                  value instanceof File
                    ? URL.createObjectURL(value)
                    : (value ?? "")
                }
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      },
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
      cell: (info) => {
        const isInactive = !info.row.original.isActive;

        return (
          <div className="flex gap-2 items-center">
            {!isInactive ? (
              <Dialog
                triggerContent={
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => handleEdit(info.row.original)}
                  >
                    <MdEdit className="text-gray-500 text-[20px]" />
                  </button>
                }
                open={open === info.row.original.bannerId}
                onOpenChange={(isOpen) => {
                  setOpen(isOpen ? info.row.original.bannerId : null);
                }}
              >
                {selectedBanner && (
                  <EditBannerForm
                    bannerData={selectedBanner}
                    onSave={() => setSelectedBanner(null)}
                    setOpen={setOpen}
                  />
                )}
              </Dialog>
            ) : (
              <button disabled className="p-1.5 cursor-not-allowed">
                <MdEdit className="text-gray-300 text-[20px]" />
              </button>
            )}

            {!isInactive ? (
              <ConfirmationDialog
                trigger={
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <FaTrash className="text-[18px] text-gray-500" />
                  </button>
                }
                confirmFunc={() => handleDelete(info.row.original.bannerId)}
              />
            ) : (
              <button disabled className="p-1.5 cursor-not-allowed">
                <FaTrash className="text-[18px] text-gray-300" />
              </button>
            )}
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data: banner.data?.data || [],
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex gap-4 max-lg:flex-col">
      <div className="flex-1">
        <Table table={table} pageIndex={1} pageSize={10} />
      </div>
    </div>
  );
};

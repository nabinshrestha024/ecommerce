import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { Table } from "../Table/Table";
import { Dialog } from "../Dialog/Dialog";
import {
  useFetchDiscountProduct,
  type DiscountData,
} from "@/hooks/discount/useFetchDiscount";
import { DiscountForm } from "./DiscountForm";
import { usePatchDicount } from "@/hooks/discount/usePatchDiscount";
import { currencyFormatter } from "../Dashboard/DashboardStats";
import { Spinner } from "../Spinner/Spinner";

export const DiscountTable = () => {
  const discountProduct = useFetchDiscountProduct();
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountData | null>(
    null,
  );

  const columnHelper = createColumnHelper<DiscountData>();

  const patchDiscount = usePatchDicount();

  const handlePatch = (discount: DiscountData) => {
    patchDiscount.mutate({
      discountId: discount.discountId,
      isActive: !discount.isActive,
      discountData: discount,
    });
  };

  const [open, setOpen] = useState<number | null>(null);

  const handleEdit = (row: DiscountData) => {
    setSelectedDiscount(row);
  };

  const columns = [
    columnHelper.accessor("discountId", {
      header: "Discount ID",
    }),

    columnHelper.accessor("discountName", {
      header: "Discount Name",
    }),

    columnHelper.accessor("discountType", {
      header: "Discount Type",
    }),
    columnHelper.accessor("discountValue", {
      header: "Discount Value",
      cell: (info) => (
        <div className="text-end">
          {currencyFormatter.format(info.getValue())}
        </div>
      ),
    }),

    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="flex gap-3 justify-start  items-center cursor-pointer">
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
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2 justify-start items-center">
          <Dialog
            open={open === info.row.original.discountId}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? info.row.original.discountId : null);
            }}
            triggerContent={
              <MdEdit
                className="text-gray-500 text-[20px] cursor-pointer"
                onClick={() => handleEdit(info.row.original)}
              />
            }
          >
            {selectedDiscount && (
              <DiscountForm discount={selectedDiscount} setOpen={setOpen} />
            )}
          </Dialog>
          <BsPatchCheckFill
            className="text-gray-500 text-[20px] cursor-pointer"
            onClick={() => handlePatch(info.row.original)}
          />
        </div>
      ),
    }),
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: discountProduct.data || [],
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return discountProduct.isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full ">
      <div className="flex flex-col-reverse gap-3">
        <Table
          table={table}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
        />
      </div>
    </div>
  );
};

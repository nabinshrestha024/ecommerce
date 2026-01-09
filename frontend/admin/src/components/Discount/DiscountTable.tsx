import { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BsPatchPlus } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { Dialog } from "../Dialog/Dialog";
import {
  useFetchDiscountProduct,
  type DiscountData,
} from "@/hooks/discount/useFetchDiscount";
import { DiscountForm } from "./DiscountForm";
import { usePatchDicount } from "@/hooks/discount/usePatchDiscount";

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
    }),

    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="flex gap-3 justify-center  items-center cursor-pointer">
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
        <div className="flex gap-2 justify-center items-center">
          <Dialog
            triggerContent={
              <FaEdit
                className="text-[#6A717F] text-[20px] cursor-pointer"
                onClick={() => handleEdit(info.row.original)}
              />
            }
          >
            {selectedDiscount && (
              <DiscountForm
                discount={selectedDiscount}
                onSave={() => {
                  setSelectedDiscount(null);
                }}
              />
            )}
          </Dialog>
          <BsPatchPlus
            className="text-[#6A717F] text-[20px] cursor-pointer"
            onClick={() => handlePatch(info.row.original)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: discountProduct.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full p-4 border border-[#E5E7EB] rounded-lg">
      <div className="flex flex-col-reverse gap-3">
        <Table table={table} />
      </div>
    </div>
  );
};

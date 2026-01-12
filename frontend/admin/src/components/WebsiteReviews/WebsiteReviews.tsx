import { useFetchWebsiteReview } from "@/hooks/websiteReview/useFetchWebsiteReview";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Table } from "../Table/Table";
import { Star } from "lucide-react";
import { useRemoveWebsiteReview } from "@/hooks/websiteReview/useRemoveWebsiteReview";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { MdDelete } from "react-icons/md";

export interface ReviewType {
  reviewId: number;
  productId: number | null;
  userId: number;
  userName: string;
  userImageUrl: string;
  content: string;
  rating: number;
  isDeleted: boolean;
  createdAt: string;
}

export const WebsiteReviews = () => {
  const columnHelper = createColumnHelper<ReviewType>();
  const removeReviews = useRemoveWebsiteReview();
  const columns = [
    columnHelper.accessor("reviewId", {
      header: () => <div className="flex justify-start">Review Id</div>,
      cell: (info) => (
        <div className="font-bold text-start">#{info.getValue()}</div>
      ),
    }),

    columnHelper.accessor("userName", {
      header: () => <div className="flex justify-start">Name</div>,
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex gap-5 items-center">
            <div className="h-15 w-15 rounded-full overflow-hidden">
              <img
                src={original.userImageUrl}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="cursor-pointer text-start">{original.userName}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      cell: (info) => (
        <div className="flex justify-center">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < info.getValue()
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("content", {
      header: () => <div className="flex justify-start w-[250px]">Content</div>,
      cell: (info) => (
        <div className="flex justify-start w-[250px]">
          <div className="whitespace-normal line-clamp-2 text-left truncate">
            {info.getValue()}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("isDeleted", {
      header: () => <div className="flex justify-start">Status</div>,

      cell: (info) => (
        <div className="flex items-center justify-start">
          <div className="flex items-center justify-start gap-2 w-19">
            <div
              className={`h-2 w-2 rounded-full ${info.getValue() ? "bg-red-500" : "bg-green-500"}`}
            ></div>
            <div
              className={`${info.getValue() ? "text-red-500" : "text-green-500"}`}
            >
              {info.getValue() ? "Inactive" : "Active"}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: () => <div className="flex justify-start">Posted At</div>,
      cell: (info) => (
        <div className="flex justify-start">
          {info.getValue().split("T")[0]}
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex justify-center">
            <ConfirmationDialog
              trigger={
                <div className="p-1 rounded-lg cursor-pointer">
                  <MdDelete className="text-[#6A717F] text-[20px]" />
                </div>
              }
              confirmFunc={() => removeReviews.mutate(row.reviewId)}
            />
          </div>
        );
      },
    }),
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError, error } = useFetchWebsiteReview(
    pagination.pageIndex + 1,
    pagination.pageSize,
  );

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data ? Math.ceil(data.totalCount / pagination.pageSize) : -1,
  });
  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>{error?.message}</div>
  ) : data.length === 0 ? (
    <div>No data</div>
  ) : (
    <Table
      table={table}
      pageIndex={pagination.pageIndex}
      pageSize={pagination.pageSize}
    />
  );
};

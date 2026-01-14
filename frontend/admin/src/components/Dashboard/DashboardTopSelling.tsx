import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "../Card/Card";
import {
  useFetchProduct,
  type ProductData,
} from "@/hooks/product/useFetchProducts";
import { Table } from "../Table/Table";
import { currencyFormatter } from "./DashboardStats";

export const DashboardTopSelling = () => {
  const { data } = useFetchProduct();
  const columnHelper = createColumnHelper<ProductData>();
  const columns = [
    columnHelper.accessor("productId", {
      header: () => <div className="flex justify-start">Product ID</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("name", {
      header: () => <div className="flex justify-start">Product</div>,
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex items-center justify-start gap-5 ">
            <div className="h-15 w-15">
              <img
                src={original.primaryImageUrl}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-left w-[120px]">
              <div className="font-semibold truncate">{original.name}</div>
              <div className="truncate text-sm text-gray-600">
                {original.shortDescription}
              </div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("categoryName", {
      header: () => <div className="flex justify-start">Category Name</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("isActive", {
      header: () => <div className="flex justify-start">Status</div>,
      cell: (info) => {
        const value = info.getValue();

        return (
          <div className="flex gap-3 justify-start items-center cursor-pointer">
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
    columnHelper.accessor("stockQuantity", {
      header: () => <div className="flex justify-start">Stock Quantity</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),
    columnHelper.accessor("price", {
      header: () => <div className="flex justify-start">Price</div>,
      cell: (info) => {
        return (
          <div className="text-right">
            {currencyFormatter.format(info.getValue())}
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data:
      data?.items?.filter((item) => item.stockQuantity ?? 0 > 0).slice(0, 5) ??
      [],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full mb-4">
      <Card>
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Best Selling Products</div>
          </div>

          <Table table={table} showPagination={false} />
        </div>
      </Card>
    </div>
  );
};

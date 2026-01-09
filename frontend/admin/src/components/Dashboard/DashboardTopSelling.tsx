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

export const DashboardTopSelling = () => {
  const { data } = useFetchProduct();
  const columnHelper = createColumnHelper<ProductData>();
  const columns = [
    columnHelper.accessor("productId", { header: "Product Id" }),
    columnHelper.accessor("name", {
      header: "Product",
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
            <div className="text-left w-[480px]">
              <div className="font-semibold truncate">{original.name}</div>
              <div className="truncate text-sm text-gray-600">
                {original.shortDescription}
              </div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("stockQuantity", { header: "Stock Quantity" }),
    columnHelper.accessor("price", { header: "Price" }),
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
        <div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Best Selling Products</div>
          </div>

          <Table table={table} showPagination={false} />
        </div>
      </Card>
    </div>
  );
};

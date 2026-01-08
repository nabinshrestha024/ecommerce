import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "../Card/Card";
import { Button } from "@/ui/button";
import { Link } from "react-router-dom";
import {
  useFetchProduct,
  type ProductData,
} from "@/hooks/product/useFetchProducts";
import { Table } from "../Table/Table";

export const DashboardTopSelling = () => {
  const { data } = useFetchProduct();
  console.log("prod", data);
  const columnHelper = createColumnHelper<ProductData>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Product",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex items-center justify-start">
            <div className="flex gap-2">
              <div className="h-10 w-10">
                <img
                  src={original.primaryImageUrl}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>{original.name}</div>
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
    data: data?.items?.filter((_, index) => index < 5) ?? [],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5">
      <Card cardClassName="px-4" className="px-0">
        <div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Best Selling Products</div>
          </div>

          <Table table={table} showPagination={false} />
        </div>
      </Card>

      <div>
        <Card>
          <div className="flex justify-between items-center">
            <div className="text-[14px] lg:text-xl font-semibold">
              Add new product
            </div>
            <Button>
              <Link to={"/product-management"}>+ Add Product</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

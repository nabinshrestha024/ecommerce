import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { FaPercent } from "react-icons/fa6";
import { Table } from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../Dialog/Dialog";
import { ProductForm } from "./ProductForm";
import { Input } from "@/ui/input";
import { useProduct, type ProductRes } from "@/hooks/product/useProduct";
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct";
import { useSearch } from "@/hooks/product/useSearch";
import { useDebounce } from "@/hooks/search/useDebounce";
import { TagForm } from "./TagForm";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { ProductDiscountForm } from "./DiscountForm";
import { Spinner } from "../Spinner/Spinner";
import { useFilter } from "@/hooks/product/useFilterProduct";
import { DropDown } from "../DropDown/DropDown";
import { IoFilter } from "react-icons/io5";
import { useFetchCategory } from "@/hooks/category/useFetchCategory";

export const ProductTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const product = useProduct(pagination.pageIndex + 1, pagination.pageSize);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // const [sortType, setSortType] = useState<"price" | "stockQuantity" | null>(null);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ProductRes | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState<number | null>(null);
  const columnHelper = createColumnHelper<ProductRes>();
  const debounceSearch = useDebounce(searchProduct, 500);
  const handleRowClick = (row: ProductRes) => {
    navigate(`/product-variant/${row.productId}`);
  };

  useEffect(() => {
    if (!debounceSearch) return;
  }, [debounceSearch]);
  const search = useSearch(debounceSearch, pagination.pageIndex + 1);

  const filter = useFilter(selectedCategory, pagination.pageIndex + 1);

  const deleteProduct = useDeleteProduct();

  const handleDelete = (productId: number) => {
    deleteProduct.mutate(productId);
  };

  const handleEdit = (row: ProductRes) => {
    setSelectedProduct(row);
  };
  const categories = useFetchCategory(1, 50);
  const isSearching = searchProduct.trim().length > 0;

  const tableData = useMemo(() => {
    if (isSearching) {
      return search.data?.items || [];
    }

    if (selectedCategory) {
      return filter.data?.items || [];
    }

    return product.data?.items || [];
  }, [
    isSearching,
    search.data?.items,
    selectedCategory,
    filter.data?.items,
    product.data?.items,
  ]);

  const columns = [
    columnHelper.accessor("productId", {
      header: () => <div className="flex justify-start">Product ID</div>,
      cell: (info) => (
        <div
          className="cursor-pointer text-left"
          onClick={() => handleRowClick(info.row.original)}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("name", {
      header: () => <div className="flex justify-start w-[260px]">Name</div>,
      cell: (info) => (
        <div
          className="cursor-pointer text-left w-[260px] "
          onClick={() => handleRowClick(info.row.original)}
        >
          <div className="font-semibold truncate">{info.getValue()}</div>
        </div>
      ),
    }),

    columnHelper.accessor("primaryImageUrl", {
      header: "Image",
      size: 200,

      cell: (info) => {
        const value = info.getValue();
        return (
          <div
            className="flex justify-start cursor-pointer"
            onClick={() => handleRowClick(info.row.original)}
          >
            <div
              style={{ width: 200 }}
              className="h-30 w-30 rounded-md overflow-hidden "
            >
              <img
                src={value ?? ""}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      },
    }),

    columnHelper.accessor("categoryName", {
      header: () => <div className="flex justify-start">Category Name</div>,
      cell: (info) => (
        <div
          className="text-left cursor-pointer"
          onClick={() => handleRowClick(info.row.original)}
        >
          <div className="font-semibold">{info.getValue()}</div>
        </div>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2 justify-start items-center">
          <Dialog
            triggerContent={
              <FaTags className="text-[#6A717F] text-[20px] cursor-pointer" />
            }
          >
            <TagForm id={info.row.original.productId} />
          </Dialog>

          <Dialog
            open={addOpen === info.row.original.productId}
            onOpenChange={(isOpen) => {
              setAddOpen(isOpen ? info.row.original.productId : null);
            }}
            triggerContent={
              <FaPercent className="text-[#6A717F] text-[20px] cursor-pointer" />
            }
          >
            <ProductDiscountForm
              id={info.row.original.productId}
              setAddOpen={setAddOpen}
            />
          </Dialog>

          <Dialog
            triggerContent={
              <MdEdit
                className="text-gray-500 text-[20px] cursor-pointer"
                onClick={() => handleEdit(info.row.original)}
              />
            }
          >
            {selectedProduct && (
              <div className="max-h-[70vh] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <ProductForm
                  product={selectedProduct}
                  onSave={() => {
                    setSelectedProduct(null);
                  }}
                />
              </div>
            )}
          </Dialog>
          <ConfirmationDialog
            trigger={<FaTrash className="text-gray-500 text-[18px]" />}
            confirmFunc={() => handleDelete(info.row.original.productId)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData || [],

    columns,
    state: { pagination },
    pageCount: Math.ceil(
      (product?.data?.totalCount ?? 0) / pagination.pageSize,
    ),
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
  });

  return product.isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full ">
      <div className="w-full justify-between flex mb-5">
        <div className="text-2xl font-bold text-gray-900 ">
          View all products
        </div>
        <div className="flex gap-3 ">
          <Input
            type="text"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Search product"
            className="w-64 pt-2.5 pb-2.5 pl-3 pr-2 border focus-visible:ring-0"
          />
          <div className="p-2 rounded-lg border shadow-2xl">
            <DropDown
              trigger={
                <div>
                  <IoFilter className="text-[#4B5563] text-[20px]" />
                </div>
              }
              className="p-2 flex flex-col gap-2"
            >
              {categories.data?.map((category) => (
                <div
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => {
                    setSelectedCategory(category.name);
                  }}
                >
                  {category.name}
                </div>
              ))}
            </DropDown>
          </div>
        </div>
      </div>
      <Table
        table={table}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
      />
    </div>
  );
};

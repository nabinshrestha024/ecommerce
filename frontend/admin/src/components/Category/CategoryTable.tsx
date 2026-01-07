import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { FaEdit, FaTags } from "react-icons/fa";
import { Table } from "../Table/Table";
import { Tabs } from "../Tabs/Tabs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { DropDown } from "../DropDown/DropDown";
import { IoFilter } from "react-icons/io5";
import { Dialog } from "../Dialog/Dialog";
import { ProductForm } from "./ProductForm";
import { Input } from "@/ui/input";
import { useProduct, type ProductRes } from "@/hooks/product/useProduct";
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct";
import { useSearch } from "@/hooks/product/useSearch";
import { useDebounce } from "@/hooks/search/useDebounce";
import { TagForm } from "./TagForm";

export const CategoryTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const product = useProduct(pagination.pageIndex + 1);
  const [searchProduct, setSearchProduct] = useState("");
  // const [sortType, setSortType] = useState<"price" | "stockQuantity" | null>(null);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ProductRes | null>(
    null,
  );

  const columnHelper = createColumnHelper<ProductRes>();
  const debounceSearch = useDebounce(searchProduct, 500);
  const handleRowClick = (row: ProductRes) => {
    navigate(`/product-variant/${row.productId}`);
  };

  useEffect(() => {
    if (!debounceSearch) return;
  }, [debounceSearch]);
  const search = useSearch(debounceSearch, pagination.pageIndex);

  const deleteProduct = useDeleteProduct();

  const handleDelete = (productId: number) => {
    deleteProduct.mutate(productId);
  };

  const handleEdit = (row: ProductRes) => {
    setSelectedProduct(row);
  };

  const isSearching = searchProduct.trim().length > 0;
  const tableData = useMemo(() => {
    return isSearching ? search.data?.items || [] : product.data?.items || [];
  }, [isSearching, search.data?.items, product.data?.items]);

  const columns = [
    columnHelper.accessor("productId", {
      header: "Product Id",
      cell: (info) => (
        <div
          className="cursor-pointer text-center"
          onClick={() => handleRowClick(info.row.original)}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("primaryImageUrl", {
      header: "Image",

      cell: (info) => {
        const value = info.getValue();
        return (
          <div
            className="w-full h-16 flex items-center border border-[#E5E7EB] rounded-md overflow-hidden"
            onClick={() => handleRowClick(info.row.original)}
          >
            <img
              src={value ?? ""}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        );
      },
    }),

    columnHelper.accessor("name", {
      header: "Product",
      cell: (info) => (
        <div
          className="cursor-pointer text-center"
          onClick={() => handleRowClick(info.row.original)}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2 justify-center items-center">
          <Dialog
            triggerContent={
              <FaTags className="text-[#6A717F] text-[20px] cursor-pointer" />
            }
          >
            <TagForm id={info.row.original.productId} />
          </Dialog>
          <Dialog
            triggerContent={
              <FaEdit
                className="text-[#6A717F] text-[20px]"
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
          <MdDelete
            className="text-[#6A717F] text-[20px]"
            onClick={() => handleDelete(info.row.original.productId)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData || [],
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  const tableFeature = useReactTable({
    columns,
    data: product.data?.items || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const tableOnSale = useReactTable({
    columns,
    data: product.data?.items || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const tableOutOfStock = useReactTable({
    columns,
    data: product.data?.items || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const tabDatas = [
    {
      id: 1,
      value: "All",
      triggerText: "All Products",
      content: <Table table={table} pageIndex={pagination.pageIndex} />,
    },

    {
      id: 2,
      value: "Featured Product",
      triggerText: "Featured Product",
      content: <Table table={tableFeature} pageIndex={pagination.pageIndex} />,
    },

    {
      id: 3,
      value: "On Sale",
      triggerText: "On Sale",
      content: <Table table={tableOnSale} pageIndex={pagination.pageIndex} />,
    },

    {
      id: 4,
      value: "Out of Stock",
      triggerText: "Out of Stock",
      content: (
        <Table table={tableOutOfStock} pageIndex={pagination.pageIndex} />
      ),
    },
  ];

  return (
    <div className="w-full  pt-6 pb-14 pl-6 pr-6 border border-[#E5E7EB] rounded-lg space-y-15">
      <div className="relative">
        <Tabs
          defaultValue="All"
          data={tabDatas}
          tabsListClassName="bg-[#EAF8E7] flex dark:bg-accent"
        ></Tabs>
        <div className="absolute top-0 right-0  flex gap-2 justify-end items-center">
          <Input
            type="text"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Search product"
            className="pt-2.5 pb-2.5 pl-3 pr-2  border-none focus-visible:border-0 focus-visible:ring-0"
          />
          <div className="p-2 rounded-sm border shadow-2xl">
            <DropDown
              trigger={
                <div>
                  <IoFilter className="text-[#4B5563] text-[20px]" />
                </div>
              }
              className="p-2 flex flex-col gap-2"
            >
              <div
                className="cursor-pointer hover:text-green-600"
                // onClick={() => setSortType("price")}
              >
                Sort by Price
              </div>

              <div
                className="cursor-pointer hover:text-green-600"
                // onClick={() => setSortType("stockQuantity")}
              >
                Sort by Stock Quantity
              </div>
            </DropDown>
          </div>

          <div
            className="p-2 rounded-sm border shadow-2xl "
            onClick={() => navigate("/product-management")}
          >
            <MdAddCircleOutline className="text-[#4B5563] text-[24px]" />
          </div>
          <div className="p-2 rounded-sm border shadow-2xl">
            <BsThreeDotsVertical className="text-[#4B5563] text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

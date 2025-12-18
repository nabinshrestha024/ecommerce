import { useState, useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Table } from "../Table/Table";
import { data } from "./ProductData.import";
import { Tabs } from "../Tabs/Tabs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { DropDown } from "../DropDown/DropDown";
import { IoFilter } from "react-icons/io5";
import { Dialog } from "../Dialog/Dialog";
import { ProductForm } from "./ProductForm";
import { Input } from "@/ui/input";

type ProductData = {
  productId: string;
  name: string;
  createdAt: string;
  order: number;
  image: string;
  category?: string;
};

const status = {
  FEATURED: "Featured",
  ONSALE: "On sale",
  OUTOFPRODUCT: "Out of stock",
};

export const CategoryTable = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [sortType, setSortType] = useState<"date" | "order" | null>(null);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null,
  );

  const handleRowClick = (row: ProductData) => {
    setSelectedProduct(row);
  };
  const columnHelper = createColumnHelper<ProductData>();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginationFeature, setPaginationFeature] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [paginationOnSale, setPaginationOnSale] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [paginationOutOfStock, setPaginationOutOfStock] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [
    columnHelper.accessor("productId", {
      header: "Product Id",
    }),

    columnHelper.accessor("image", {
      header: "Image",

      cell: (info) => {
        const value = info.getValue();
        return (
          <div className="w-full h-16 flex items-center border border-[#E5E7EB] rounded-md overflow-hidden">
            <img
              src={value}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        );
      },
    }),

    columnHelper.accessor("name", {
      header: "Product",
    }),

    columnHelper.accessor("order", {
      header: "Order",
    }),
    columnHelper.accessor("createdAt", {
      header: "Created Date",
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2 justify-center items-center">
          <Dialog
            triggerContent={
              <FaEdit
                className="text-[#6A717F] text-[20px]"
                onClick={() => handleRowClick(info.row.original)}
              />
            }
          >
            {selectedProduct && <ProductForm product={selectedProduct} />}
          </Dialog>
          <MdDelete className="text-[#6A717F] text-[20px]" />
        </div>
      ),
    }),
  ];

  const filteredData = useMemo(() => {
    const filterBySearch = (products: ProductData[]) => {
      if (!searchProduct) return products;
      return products.filter(
        (product) =>
          product.productId
            .toLowerCase()
            .includes(searchProduct.toLowerCase()) ||
          product.name.toLowerCase().includes(searchProduct.toLowerCase()),
      );
    };

    const sortProduct = (products: ProductData[]) => {
      if (sortType === "date") {
        return [...products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }
      if (sortType === "order") {
        return [...products].sort((a, b) => a.order - b.order);
      }
      return products;
    };

    return {
      all: sortProduct(filterBySearch(data)),
      featuredProduct: sortProduct(
        filterBySearch(data.filter((d) => d.status === status.FEATURED)),
      ),
      onSale: sortProduct(
        filterBySearch(data.filter((d) => d.status === status.ONSALE)),
      ),
      outofStock: sortProduct(
        filterBySearch(data.filter((d) => d.status === status.OUTOFPRODUCT)),
      ),
    };
  }, [searchProduct, sortType]);

  const table = useReactTable({
    data: filteredData.all,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  const tableFeature = useReactTable({
    columns,
    data: filteredData.featuredProduct,
    state: { pagination: paginationFeature },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationFeature,
  });

  const tableOnSale = useReactTable({
    columns,
    data: filteredData.onSale,
    state: { pagination: paginationOnSale },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationOnSale,
  });

  const tableOutOfStock = useReactTable({
    columns,
    data: filteredData.outofStock,
    state: { pagination: paginationOutOfStock },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationOutOfStock,
  });

  const tabDatas = [
    {
      id: 1,
      value: "All",
      triggerText: "All Orders",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };

  return (
    <div className="w-full  pt-6 pb-14 pl-6 pr-6 border border-[#E5E7EB] rounded-lg">
      <div className="relative">
        <Tabs
          defaultValue="All"
          data={tabDatas}
          tabsListClassName="bg-[#EAF8E7] flex"
        ></Tabs>
        <div className="absolute top-0 right-0  flex gap-2 justify-end items-center">
          <Input
            type="text"
            value={searchProduct}
            onChange={handleChange}
            placeholder="Search product"
            className="pt-2.5 pb-2.5 pl-3 pr-2  border-none bg-[#F9FAFB] focus-visible:border-0 focus-visible:ring-0"
          />
          <div className="p-2 rounded-sm border shadow-2xl bg-[#F9FAFB]">
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
                onClick={() => setSortType("date")}
              >
                Sort by Date
              </div>

              <div
                className="cursor-pointer hover:text-green-600"
                onClick={() => setSortType("order")}
              >
                Sort by Order
              </div>
            </DropDown>
          </div>

          <div
            className="p-2 rounded-sm border shadow-2xl bg-[#F9FAFB]"
            onClick={() => navigate("/product-management")}
          >
            <MdAddCircleOutline className="text-[#4B5563] text-[24px]" />
          </div>
          <div className="p-2 rounded-sm border shadow-2xl bg-[#F9FAFB]">
            <BsThreeDotsVertical className="text-[#4B5563] text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useMemo, useState } from "react";
import {
  useGetProductById,
  type ProductVariant,
} from "@/hooks/product/useGetProductById";
import { Dialog } from "../Dialog/Dialog";
import { useFetchAttribute } from "@/hooks/attribute/useFetchAttribute";
import { Button } from "@/ui/button";
import { useAddVariant } from "@/hooks/variants/useAddVariant";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { Link, useParams } from "react-router-dom";
import { currencyFormatter } from "../Dashboard/DashboardStats";
import { MdAddCircleOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { VariantForm } from "./VariantForm";
import { IoMdArrowBack } from "react-icons/io";

export interface Variant {
  variantId: number;
  productId: number;
  price: number;
  stockQuantity: number;
  isActive: boolean;
  isDefault: boolean;
}

export const CategoryDetails = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const params = useParams();
  const { data } = useGetProductById(Number(params.id));
  const attribute = useFetchAttribute();
  const tableData = useMemo(() => {
    return data?.variants || [];
  }, [data?.variants]);
  const addVariant = useAddVariant(Number(params.id));
  const [open, setOpen] = useState(false);
  const columnHelper = createColumnHelper<ProductVariant>();

  const [selectedValues, setSelectedValues] = useState<Record<string, number>>(
    {},
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [price, setPrice] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<string>("");

  const handleSelectChange = (attributeName: string, valueId: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [attributeName]: Number(valueId),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[attributeName];
      return next;
    });
  };

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const handleEdit = (row: Variant) => {
    setSelectedVariant(row);
  };

  const handleAddVariant = () => {
    const requiredAttrs =
      attribute?.data
        ?.filter((attr) =>
          data?.availableAttributes.some((a) => a.name === attr.name),
        )
        .map((a) => a.name) || [];
    const newErrors: Record<string, string> = {};
    requiredAttrs.forEach((name) => {
      if (selectedValues[name] == null) {
        newErrors[name] = `Please select ${name}`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const attributeValueIds = Object.values(selectedValues);

    const variantData = {
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      isDefault: true,
      isActive: true,
      attributeValueIds,
    };

    addVariant.mutate(variantData, {
      onSuccess: () => {
        setPrice("");
        setStockQuantity("");
        setErrors({});
        setSelectedValues({});
        setOpen(false);
      },
    });
  };

  const columns = [
    columnHelper.accessor("variantId", {
      header: () => <div className="flex justify-start">Variant ID</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),

    columnHelper.accessor("attributes", {
      header: () => (
        <div className="flex justify-start">Variant Attributes</div>
      ),
      cell: (info) => {
        const attrs = info.getValue() as Record<string, string> | undefined;
        if (!attrs || typeof attrs !== "object") return null;
        return (
          <div className="flex flex-wrap gap-2">
            {Object.entries(attrs).map(([k, v]) => (
              <div key={k} className="px-2 py-1 bg-gray-100 rounded text-xs">
                {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
              </div>
            ))}
          </div>
        );
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

    columnHelper.accessor("stockQuantity", {
      header: () => <div className="flex justify-start">Stock Quantity</div>,
      cell: (info) => {
        return <div className="text-left">{info.getValue()}</div>;
      },
    }),

    columnHelper.display({
      id: "actions",
      header: () => <div className="flex justify-start">Action</div>,
      cell: (info) => (
        <Dialog
          triggerContent={
            <MdEdit
              className="text-gray-500 text-[20px] cursor-pointer flex items-center"
              onClick={() => {
                handleEdit(info.row.original);
              }}
            />
          }
        >
          {selectedVariant && (
            <VariantForm
              variant={{
                ...selectedVariant,
                variantId: selectedVariant.variantId,
              }}
              onSave={() => {
                setSelectedVariant(null);
              }}
            />
          )}
        </Dialog>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-10">
          <Link to={"/product"} className="flex items-center justify-center">
            <IoMdArrowBack className="text-xl" />
          </Link>
          <div>
            <div className="text-sm text-gray-600">Product ID</div>
            <div className="font-medium">{data?.productId}</div>
          </div>
          <div className="max-w-[200px]">
            <div className="text-sm text-gray-600 ">Product Name</div>
            <div className="font-medium">{data?.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Category</div>
            <div className="font-medium">{data?.categoryName}</div>
          </div>
        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          triggerContent={
            <Button className="flex items-center gap-2">
              <MdAddCircleOutline className="text-white text-[24px]" />
              Add Variant
            </Button>
          }
        >
          <div className="max-w-[455px] p-3">
            <div className="font-bold text-2xl mb-4">Add new Variant </div>
            <div className="space-y-4 mb-4">
              <div className="space-y-4">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="no-spinner"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  placeholder="Enter stock quantity"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="no-spinner"
                />
              </div>
            </div>

            <div className="font-medium mb-2">Variant attributes:</div>

            <div className="flex gap-5">
              {attribute?.data
                ?.filter((attr) =>
                  data?.availableAttributes.some((a) => a.name === attr.name),
                )
                .map((attr) => (
                  <div key={attr.attributeId} className="grid grid-cols-2">
                    <div className="space-y-4">
                      <Label htmlFor={attr.name}>{attr.name}</Label>
                      <Select
                        value={selectedValues[attr.name]?.toString()}
                        onValueChange={(value) =>
                          handleSelectChange(attr.name, value)
                        }
                      >
                        <SelectTrigger
                          id={attr.name}
                          className={errors[attr.name] ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder={`Select ${attr.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {attr.values.map((val) => (
                            <SelectItem
                              key={val.attributeValueId}
                              value={val.attributeValueId.toString()}
                            >
                              {val.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[attr.name] && (
                        <div className="text-xs text-red-600">
                          {errors[attr.name]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => {
                handleAddVariant();
              }}
            >
              Save
            </Button>
          </div>
        </Dialog>
      </div>
      <Table
        table={table}
        pageIndex={pagination.pageIndex}
        showPagination={false}
      />
    </div>
  );
};

"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
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
import { useParams } from "react-router-dom";

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
  const [price, setPrice] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<string>("");

  useEffect(() => {
    if (!data || !attribute?.data) return;
    const temp: Record<string, number> = {};
    data.availableAttributes.forEach((attr) => {
      const fullAttr = attribute?.data?.find((a) => a.name === attr.name);
      if (!fullAttr || !fullAttr.values.length) return;
      const firstValue = fullAttr.values.find((val) =>
        attr.values.includes(val.value),
      );

      if (firstValue) {
        temp[attr.name] = firstValue.attributeValueId;
      }
    });

    setSelectedValues(temp);
  }, [data, attribute?.data]);

  const handleSelectChange = (attributeName: string, valueId: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [attributeName]: Number(valueId),
    }));
  };

  const handleAddVariant = () => {
    const attributeValueIds = Object.values(selectedValues);

    const variantData = {
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      isDefault: true,
      isActive: true,
      attributeValueIds,
    };
    console.log(variantData);

    addVariant.mutate(variantData);
    setPrice("");
    setStockQuantity("");
  };

  const columns = [
    columnHelper.accessor("variantId", {
      header: "Variant Id",
    }),

    columnHelper.accessor("attributes", {
      header: "Variant Attributes",
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

    columnHelper.accessor("price", {
      header: "Price",
    }),

    columnHelper.accessor("stockQuantity", {
      header: "Stock Quantity",
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
        <div className="flex gap-5">
          <div>
            <div className="text-sm text-gray-600">Product ID</div>
            <div className="font-medium">{data?.productId}</div>
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
              <Plus size={16} />
              Add Variant
            </Button>
          }
        >
          <div className="max-w-[455px] p-3">
            <div className="font-bold mb-4">Add new Variant </div>
            <div className="space-y-4 mb-4">
              <div className="space-y-4">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                />
              </div>
            </div>

            <div className="font-medium mb-2">Select variant attributes:</div>

            <div className="flex gap-5">
              {attribute?.data
                ?.filter((attr) =>
                  data?.availableAttributes.some((a) => a.name === attr.name),
                )
                .map((attr) => (
                  <div key={attr.attributeId} className="space-y-4">
                    <Label htmlFor={attr.name}>{attr.name}</Label>
                    <Select
                      value={selectedValues[attr.name]?.toString()}
                      onValueChange={(value) =>
                        handleSelectChange(attr.name, value)
                      }
                    >
                      <SelectTrigger id={attr.name}>
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
                  </div>
                ))}
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => {
                handleAddVariant();
                setOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </Dialog>
      </div>
      <Table table={table} pageIndex={pagination.pageIndex} />
    </div>
  );
};

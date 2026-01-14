"use client";

import { useMemo, useState } from "react";
import { useGetVendor } from "@/hooks/vendor/useGetVendor";
import { useDeleteVendor } from "@/hooks/vendor/useDeleteVendor";

import { VendorTableInternal } from "./VendorTableInternal";
import type { VendorTableProps } from "./types";

export const VendorTable = () => {
  const { mutate: deleteVendor } = useDeleteVendor();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isError } = useGetVendor(
    pagination.pageIndex + 1,
    pagination.pageSize,
  );
  const [editingVendor, setEditingVendor] = useState<VendorTableProps | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const vendors = useMemo(() => {
    if (!Array.isArray(data?.data?.items)) return [];
    return [...data.data.items].sort((a, b) => a.vendorId - b.vendorId);
  }, [data]);

  return (
    <div className="w-full">
      <VendorTableInternal
        data={vendors}
        editingVendor={editingVendor}
        setEditingVendor={setEditingVendor}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onDelete={deleteVendor}
        pagination={pagination}
        setPagination={setPagination}
      />

      {isError && (
        <div className="text-red-600 text-center mt-4">
          Error fetching vendor data.
        </div>
      )}
    </div>
  );
};

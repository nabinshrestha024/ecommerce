"use client";

import { useMemo, useState } from "react";
import { useGetVendor } from "@/hooks/vendor/useGetVendor";
import { useDeleteVendor } from "@/hooks/vendor/useDeleteVendor";

import { VendorTableInternal } from "./VendorTableInternal";
import type { VendorTableProps } from "./types";

export const VendorTable = () => {
  const { data, isError } = useGetVendor();
  const { mutate: deleteVendor } = useDeleteVendor();

  const [editingVendor, setEditingVendor] = useState<VendorTableProps | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const vendors = useMemo(() => {
    if (!Array.isArray(data?.data)) return [];
    return [...data.data].sort((a, b) => a.vendorId - b.vendorId);
  }, [data]);

  return (
    <div className="w-full px-4">
      <h2 className="text-lg font-bold mb-4">Vendors Table</h2>

      <VendorTableInternal
        data={vendors}
        editingVendor={editingVendor}
        setEditingVendor={setEditingVendor}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onDelete={deleteVendor}
      />

      {isError && (
        <div className="text-red-600 text-center mt-4">
          Error fetching vendor data.
        </div>
      )}
    </div>
  );
};

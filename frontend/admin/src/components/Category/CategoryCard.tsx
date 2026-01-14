"use client";

import {
  useFetchCategory,
  type CategoryData,
} from "@/hooks/category/useFetchCategory";
import { Card } from "../Card/Card";
import { Dialog } from "../Dialog/Dialog";
import { FaEdit } from "react-icons/fa";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";
import { MdDelete } from "react-icons/md";
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";
import { useState, useMemo } from "react";
import { EditCategoryForm } from "./EditCategoryForm";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

type SelectedCategory = {
  categoryId: number;
  categoryData: CategoryData;
};

export const CategoryCard = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const categories = useFetchCategory(
    pagination.pageIndex + 1,
    pagination.pageSize,
  );
  const deleteCategory = useDeleteCategory();

  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);

  const allCategories = categories.data ?? [];
  const totalCount = allCategories.length;
  const totalPages = Math.ceil(totalCount / pagination.pageSize);
  const currentPage = pagination.pageIndex;

  const paginatedCategories = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return allCategories.slice(start, end);
  }, [allCategories, pagination]);

  const maxVisiblePages = 5;

  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - maxVisiblePages);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  const handleDelete = (categoryId: number) => {
    deleteCategory.mutate(categoryId);
  };

  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full grid grid-cols-4 gap-5 pb-10">
        {paginatedCategories.map((category: CategoryData) => (
          <Card
            key={category.categoryId}
            className="w-full p-0 rounded-md"
            cardClassName="p-3 border border-[#E5E7EB] shadow-sm"
          >
            <div className="flex flex-col gap-3">
              <div className="w-full h-[185px] border rounded-md overflow-hidden">
                <img
                  src={
                    category.categoryImageURL instanceof File
                      ? URL.createObjectURL(category.categoryImageURL)
                      : (category.categoryImageURL ?? "")
                  }
                  alt="category"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-[16px] font-semibold">{category.name}</div>

                <div className="flex gap-2 items-center">
                  <Dialog
                    open={open === category.categoryId}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        setOpen(null);
                        setSelectedCategory(null);
                      }
                    }}
                    triggerContent={
                      <button
                        onClick={() => {
                          setSelectedCategory({
                            categoryId: category.categoryId,
                            categoryData: category,
                          });
                          setOpen(category.categoryId);
                        }}
                        className="p-1.5 rounded-md hover:bg-gray-100"
                      >
                        <FaEdit className="text-[18px]" />
                      </button>
                    }
                  >
                    {selectedCategory?.categoryId === category.categoryId && (
                      <EditCategoryForm
                        categoryData={selectedCategory.categoryData}
                        onSave={() => setSelectedCategory(null)}
                        setOpen={setOpen}
                      />
                    )}
                  </Dialog>

                  <ConfirmationDialog
                    trigger={<MdDelete className="text-[18px]" />}
                    confirmFunc={() => handleDelete(category.categoryId)}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 0 && (
        <div className="flex justify-between items-center fixed bottom-5 left-0 w-full">
          <Pagination>
            <PaginationContent className="flex justify-around w-full">
              <PaginationItem className="flex gap-2">
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 0 &&
                    setPagination((p) => ({
                      ...p,
                      pageIndex: p.pageIndex - 1,
                    }))
                  }
                  className={
                    currentPage === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />

                {visiblePages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() =>
                        setPagination((p) => ({
                          ...p,
                          pageIndex: page,
                        }))
                      }
                      className={
                        currentPage === page
                          ? "bg-[#C1E6BA] hover:bg-[#C1E6BA]"
                          : "cursor-pointer"
                      }
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages - 1 &&
                    setPagination((p) => ({
                      ...p,
                      pageIndex: p.pageIndex + 1,
                    }))
                  }
                  className={
                    currentPage >= totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <Select
                defaultValue={String(pagination.pageSize)}
                onValueChange={(value) =>
                  setPagination({ pageIndex: 0, pageSize: Number(value) })
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                </SelectContent>
              </Select>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

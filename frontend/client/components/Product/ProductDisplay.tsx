"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { Category } from "./Category";
import { useGetCatalogProduct } from "@/hooks/filter/useGetCatalogProduct";
import { Variant, VariantAttributes } from "./ProductDetails";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";
import { Filter } from "./Filter";
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
import { Dialog } from "../dialog/Dialog";
import { Funnel } from "lucide-react";
export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "NPR",
});
type FilterFormValues = {
  minPrice: string;
  maxPrice: string;
  tags: string[];
};

type ActiveFilters = FilterFormValues | Record<string, string>;

const isFilterFormValues = (v: ActiveFilters): v is FilterFormValues =>
  typeof v === "object" &&
  v !== null &&
  "tags" in v &&
  Array.isArray((v as FilterFormValues).tags);

interface ImageType {
  productImageId: number;
  imageUrl: string;
  productId: number;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductType {
  productId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
  sku: string;
  variants: Variant[] | undefined;
  availableAttributes?: VariantAttributes[];
  images: ImageType[];
  relatedProducts: ProductType[];
}

export const ProductDisplay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("categoryId");
  const categoryId = categoryParam ? Number(categoryParam) : null;
  const tagsParam = searchParams.get("tags");
  const tagsFromUrl = useMemo(
    () => (tagsParam ? tagsParam.split(",") : []),
    [tagsParam],
  );

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    minPrice: "",
    maxPrice: "",
    tags: [],
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const effectiveTags =
    isFilterFormValues(activeFilters) && activeFilters.tags.length > 0
      ? activeFilters.tags
      : tagsFromUrl;

  const [clicked, setClicked] = useState(false);
  const catalogProducts = useGetCatalogProduct({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    categoryId: categoryId ?? undefined,
    tagNames: effectiveTags.length ? effectiveTags : undefined,
    minPrice: activeFilters.minPrice || undefined,
    maxPrice: activeFilters.maxPrice || undefined,
  });
  const dataSource = catalogProducts.data?.data;
  const displayItems = dataSource?.items || [];
  const totalCount = dataSource?.totalCount || 0;

  const isLoading = catalogProducts.isLoading;
  const isError = catalogProducts.isError;
  const highestPrice = catalogProducts.data?.data?.highestPrice || 0;
  const placeholderCount = 12;
  const totalPages = Math.ceil(totalCount / pagination.pageSize);
  const maxVisiblePages = 5;
  const currentPage = pagination.pageIndex;

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

  const handleFilterChange = (filters: FilterFormValues) => {
    setActiveFilters(filters);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));

    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) params.set("categoryId", categoryId.toString());
    if (filters.tags.length > 0) params.set("tags", filters.tags.join(","));
    else params.delete("tags");

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    else params.delete("minPrice");

    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    else params.delete("maxPrice");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col md:flex-row gap-5 items-start w-full">
      <div className="flex flex-col gap-3 w-full md:w-40 md:min-w-40 md:sticky md:top-8 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto md:pr-2 shrink-0 ">
        <div className="text-xl font-semibold underline mb-2 md:mb-1">
          Categories
        </div>
        <div className="flex flex-row justify-between items-center w-full md:flex-col md:overflow-visible md:items-start gap-3 md:gap-5">
          <Dialog
            open={clicked}
            onOpenChange={setClicked}
            triggerClassName="md:hidden"
            contentClassName="max-w-md w-[90vw]"
            triggerText={
              <div className="flex flex-row items-center gap-2 md:hidden rounded-sm shadow-md border px-2 ">
                <span className="font-semibold ">Filter</span>
                <Funnel className="w-3.5 h-3.5 text-gray-600" />
              </div>
            }
          >
            <Filter
              onFilterChange={handleFilterChange}
              onClose={() => setClicked(false)}
              highestPrice={highestPrice}
            />
          </Dialog>
          <Category />
        </div>
        <div className="hidden md:block ">
          <Filter
            onFilterChange={handleFilterChange}
            highestPrice={highestPrice}
          />
        </div>
      </div>

      <div className="space-y-5 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 w-full gap-3 md:gap-6">
          {(isLoading || isError) &&
            Array.from({ length: placeholderCount }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          {!isLoading && !isError && displayItems.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found.
            </div>
          )}

          {!isLoading &&
            !isError &&
            displayItems
              .filter(
                (product: ProductType) => (product.stockQuantity ?? 0) > 0,
              )
              .map((product: ProductType) => (
                <ProductCard key={product.productId} product={product} />
              ))}
        </div>

        {totalPages > 0 && (
          <div className="flex items-center justify-between mt-8">
            <Pagination>
              <PaginationContent className="flex justify-around w-full">
                <PaginationItem className="flex gap-2">
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage > 0) {
                        setPagination({
                          ...pagination,
                          pageIndex: currentPage - 1,
                        });
                      }
                    }}
                    className={
                      currentPage === 0
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />

                  {startPage > 0 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            setPagination({ ...pagination, pageIndex: 0 })
                          }
                          isActive={currentPage === 0}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    </>
                  )}

                  {visiblePages.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() =>
                          setPagination({ ...pagination, pageIndex: page })
                        }
                        isActive={currentPage === page}
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

                  {endPage < totalPages && (
                    <>
                      <PaginationItem>
                        <span className="px-2">...</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            setPagination({
                              ...pagination,
                              pageIndex: totalPages - 1,
                            })
                          }
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationNext
                    onClick={() => {
                      if (currentPage < totalPages - 1) {
                        setPagination({
                          ...pagination,
                          pageIndex: currentPage + 1,
                        });
                      }
                    }}
                    className={
                      currentPage >= totalPages - 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <Select
                    defaultValue={String(pagination.pageSize)}
                    onValueChange={(value) =>
                      setPagination({ pageIndex: 0, pageSize: Number(value) })
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

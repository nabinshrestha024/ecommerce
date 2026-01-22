"use client";

import { useState, useMemo, useEffect, useRef, useReducer } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { Category } from "./Category";
import { useGetCatalogProduct } from "@/hooks/filter/useGetCatalogProduct";
import { Variant, VariantAttributes } from "./ProductDetails";
import { ProductCardSkeleton } from "../TrendingProduct/component/ProductCardLoading";
import { Filter } from "./Filter";
import { Dialog } from "../dialog/Dialog";
import { Funnel } from "lucide-react";
import { AttributeType } from "../Order/Order";
import { X } from "lucide-react";
export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "NPR",
});

const ITEMS_PER_PAGE = 20;

type FilterFormValues = {
  minPrice?: string;
  maxPrice?: string;
  tags: string[];
};

type ActiveFilters = FilterFormValues | Record<string, string>;

const isFilterFormValues = (v: ActiveFilters): v is FilterFormValues =>
  typeof v === "object" &&
  v !== null &&
  "tags" in v &&
  Array.isArray((v as FilterFormValues).tags);

interface ItemsState {
  items: ProductType[];
  hasMore: boolean;
  pageIndex: number;
}

type ItemsAction =
  | {
      type: "APPEND_ITEMS";
      payload: ProductType[];
      pageIndex: number;
      pageSize: number;
    }
  | { type: "SET_ITEMS"; payload: ProductType[] }
  | { type: "RESET" }
  | { type: "INCREMENT_PAGE" };

const itemsReducer = (state: ItemsState, action: ItemsAction): ItemsState => {
  switch (action.type) {
    case "APPEND_ITEMS":
      return {
        items:
          action.pageIndex === 0
            ? action.payload
            : [...state.items, ...action.payload],
        hasMore: action.payload.length === action.pageSize,
        pageIndex: action.pageIndex,
      };
    case "SET_ITEMS":
      return {
        items: action.payload,
        hasMore: true,
        pageIndex: state.pageIndex,
      };
    case "RESET":
      return {
        items: [],
        hasMore: true,
        pageIndex: 0,
      };
    case "INCREMENT_PAGE":
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      };
    default:
      return state;
  }
};

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
  finalPrice: number;
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
  tags: Tag[];
  discountId: number;
}

export interface Tag {
  tagId: number;
  name: string;
}

export interface LocalCartType {
  cartId: number;
  productId: number;
  variantId: number;

  productName: string;
  sku: string;
  productImageUrl: string;
  description: string;

  price: number;
  quantity: number;
  totalPrice: number;
  finalPrice: number;

  addedDate: string;
  attributes: AttributeType[];
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

  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    minPrice: minPriceParam || "",
    maxPrice: maxPriceParam || "",
    tags: tagsFromUrl,
  });

  useEffect(() => {
    setActiveFilters({
      minPrice: minPriceParam || "",
      maxPrice: maxPriceParam || "",
      tags: tagsFromUrl,
    });
  }, [minPriceParam, maxPriceParam, tagsParam]);

  const effectiveTags = isFilterFormValues(activeFilters)
    ? activeFilters.tags
    : [];

  const [itemsState, dispatchItems] = useReducer(itemsReducer, {
    items: [],
    hasMore: true,
    pageIndex: 0,
  });
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [clicked, setClicked] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const catalogProducts = useGetCatalogProduct({
    page: itemsState.pageIndex === 0 ? 1 : itemsState.pageIndex + 1,

    pageSize: ITEMS_PER_PAGE,
    categoryId: categoryId ?? undefined,
    tagNames: effectiveTags.length ? effectiveTags : undefined,
    minPrice:
      isFilterFormValues(activeFilters) && activeFilters.minPrice
        ? activeFilters.minPrice
        : undefined,
    maxPrice:
      isFilterFormValues(activeFilters) && activeFilters.maxPrice
        ? activeFilters.maxPrice
        : undefined,
  });

  const isLoading = catalogProducts.isLoading;
  const isError = catalogProducts.isError;
  const highestPrice = catalogProducts.data?.data?.highestPrice || 0;
  const handleDisableFilter = (args: number) => {
    if (!isFilterFormValues(activeFilters)) return;
    const newTags = [...activeFilters.tags];
    newTags.splice(args, 1);
    const newFilters = {
      ...activeFilters,
      tags: newTags,
    };
    dispatchItems({ type: "RESET" });
    setActiveFilters(newFilters);

    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) params.set("categoryId", categoryId.toString());
    else params.delete("categoryId");

    if (newFilters.tags.length) params.set("tags", newFilters.tags.join(","));
    else params.delete("tags");

    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    else params.delete("minPrice");

    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    else params.delete("maxPrice");

    router.replace(`?${params.toString()}`, { scroll: false });
  };
  useEffect(() => {
    if (!catalogProducts.data?.data) return;

    const newItems = catalogProducts.data.data.items;
    dispatchItems({
      type: "APPEND_ITEMS",
      payload: newItems,
      pageIndex: itemsState.pageIndex,
      pageSize: ITEMS_PER_PAGE,
    });
  }, [catalogProducts.data, itemsState.pageIndex]);

  useEffect(() => {
    if (!loaderRef.current || !itemsState.hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatchItems({ type: "INCREMENT_PAGE" });
          setFirstLoad(false);
        }
      },
      { threshold: 1 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [itemsState.hasMore, isLoading]);

  const handleFilterChange = (filters: FilterFormValues) => {
    setActiveFilters(filters);
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) params.set("categoryId", categoryId.toString());
    else params.delete("categoryId");

    if (filters.tags.length) params.set("tags", filters.tags.join(","));
    else params.delete("tags");

    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    else params.delete("minPrice");

    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    else params.delete("maxPrice");

    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const placeholderCount = 5;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col md:flex-row gap-5 items-start w-full">
      <div className="flex flex-col gap-3 w-full md:w-40 md:min-w-40 md:sticky md:top-8 md:max-h-[calc(100vh-4rem)] md:overflow-y-auto md:pr-2 shrink-0">
        <div className="text-xl font-semibold underline">Categories</div>

        <div className="flex justify-between md:flex-col gap-3">
          <Dialog
            open={clicked}
            onOpenChange={setClicked}
            triggerClassName="md:hidden"
            contentClassName="max-w-md w-[90vw]"
            triggerText={
              <div className="flex items-center gap-2 rounded-sm shadow-md border px-2">
                <span className="font-semibold">Filter</span>
                <Funnel className="w-3.5 h-3.5 text-gray-600" />
              </div>
            }
          >
            <Filter
              onFilterChange={handleFilterChange}
              onClose={() => setClicked(false)}
              highestPrice={highestPrice}
              selectedFilters={
                isFilterFormValues(activeFilters) ? activeFilters : undefined
              }
              isOpen={clicked}
            />
          </Dialog>

          <Category />
        </div>
        <div>
          {activeFilters.tags &&
          isFilterFormValues(activeFilters) &&
          activeFilters.tags.length > 0 ? (
            <div className="mb-4">
              <h2 className="text-md font-semibold mb-2">Active Tags:</h2>
              <div className="flex flex-wrap gap-2 ">
                {activeFilters.tags.map((tag, index) => (
                  <div
                    key={tag}
                    className="shadow-md shrink-0 flex flex-row font-semibold text-[14px] bg-white px-2 justify-between items-center py-1 gap-1 rounded-xl cursor-pointer"
                  >
                    {tag}
                    <span onClick={() => handleDisableFilter(index)}>
                      <X className="w-4 h-4 cursor-pointer" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="hidden md:block">
          <Filter
            onFilterChange={handleFilterChange}
            highestPrice={highestPrice}
            selectedFilters={
              isFilterFormValues(activeFilters) ? activeFilters : undefined
            }
            isOpen={true}
          />
        </div>
      </div>

      <div className="space-y-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-6">
          {itemsState.items
            .filter((p) => (p.stockQuantity ?? 0) > 0)
            .map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}

          {(isLoading || isError) &&
            firstLoad &&
            Array.from({ length: placeholderCount }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}

          {!isLoading && !isError && itemsState.items.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found.
            </div>
          )}
        </div>

        {itemsState.hasMore && (
          <div
            ref={loaderRef}
            className="w-full py-6 text-center text-gray-500"
          >
            Loading more products...
          </div>
        )}
      </div>
    </div>
  );
};

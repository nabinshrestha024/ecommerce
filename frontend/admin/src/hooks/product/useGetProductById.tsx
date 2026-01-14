import { getProductById } from "@/lib/product/getProductById";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  productId: number;
  categoryId: number;
  name: string;
  categoryName: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  hasVariants: boolean;
  isActive: boolean;
  price: number;
  stockQuantity: number;
  variants: ProductVariant[];
  images: ProductImage[];
  availableAttributes: AvailableAttribute[];
}

export interface ProductVariant {
  productId: number;
  variantId: number;
  sku: string;
  price: number;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  attributes: Record<string, string>;
}

export interface ProductImage {
  productImageId: number;
  imageUrl: string;
  productId: number;
  isPrimary: boolean;
  sortOrder: number;
}

export interface AvailableAttribute {
  name: string;
  values: string[];
}

export const useGetProductById = (productId: number) => {
  const { data, isLoading, isError, refetch } = useQuery<Product>({
    queryKey: ["productDataById"],
    queryFn: () => getProductById(productId),
  });
  return { data, isLoading, isError, refetch };
};

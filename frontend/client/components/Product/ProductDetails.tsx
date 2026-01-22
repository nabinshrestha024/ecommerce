"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/ui/button";
import { useProductDetails } from "@/hooks/product/useProductDetails";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ProductCard } from "./ProductCard";
import { Card } from "../Card/Card";
import { ProductReview } from "./Review/ProductReview";
import { currencyFormatter } from "./ProductDisplay";
import { Spinner } from "../Spinner/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { useParams } from "next/navigation";

export interface Variant {
  variantId: number;
  sku: string;
  price: number;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  attributes: Record<string, string | undefined>;
  finalPrice: number;
}

export interface VariantAttributes {
  name: string;
  values: string[];
}

const getDefaultSelectedVariants = (
  variants?: Variant[] | undefined,
): Record<string, string | undefined> => {
  const defaultVariant = variants?.find((v) => v.isDefault);
  return defaultVariant?.attributes ?? {};
};

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: productItems,
    isLoading,
    isError,
  } = useProductDetails(id as string);
  const addToCart = useAddToCart();
  const { token } = useAuth();

  const defaultImage = productItems?.images[0]?.imageUrl;
  const [images, setImages] = useState<string | undefined>(defaultImage);
  const displayedImage = images ?? defaultImage;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string | undefined>
  >(() => getDefaultSelectedVariants(productItems?.variants));

  if (productItems?.variants && Object.keys(selectedVariants).length === 0) {
    const defaults = getDefaultSelectedVariants(productItems.variants);
    if (Object.keys(defaults).length > 0) {
      setSelectedVariants(defaults);
    }
  }

  const activeVariant = productItems?.variants?.find((variant) =>
    Object.entries(selectedVariants).every(
      ([key, value]) => variant.attributes[key] === value,
    ),
  );

  const handleVariantChange = (attributeName: string, value: string) => {
    const variants = productItems?.variants ?? [];
    const nextSelection = { ...selectedVariants, [attributeName]: value };

    Object.keys(nextSelection).forEach((key) => {
      if (key === attributeName) return;

      const valid = variants.find(
        (v) =>
          v.attributes[attributeName] === value &&
          v.attributes[key] === nextSelection[key],
      );

      if (!valid) {
        const fallback = variants.find(
          (v) => v.attributes[attributeName] === value,
        );
        nextSelection[key] = fallback?.attributes[key];
      }
    });

    setSelectedVariants(nextSelection);
  };

  const isAvailable = (
    variants: Variant[] | undefined,
    selected: Record<string, string | undefined>,
    attrName: string,
    value: string,
  ) => {
    const temp = { ...selected, [attrName]: value };
    return variants?.some((v) =>
      Object.entries(temp).every(
        ([key, val]) => !val || v.attributes[key] === val,
      ),
    );
  };

  const handleAddToCart = () => {
    if (!token) {
      toast.message("Login to add to cart");
      return;
    }

    addToCart.mutate({
      variantId: activeVariant?.variantId ?? 0,
      quantity,
    });
  };

  const imageUrls = productItems?.images?.map((img) => img.imageUrl);

  return isLoading || isError ? (
    <Spinner />
  ) : (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/product">Product</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/product/id/${productItems.data?.slug}`}>
              {productItems.data?.slug}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="p-0 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 py-2">
          <div className="flex flex-col gap-5 p-2 ">
            <div className="w-full max-w-[645px] h-[450px] relative mx-auto">
              <Image
                src={displayedImage || ""}
                alt="Product"
                fill
                className="rounded-xl object-cover"
                unoptimized
              />
            </div>

            <div className="flex justify-start lg:justify-center gap-2 border-t-2 pt-2 overflow-x-auto">
              {imageUrls?.map((image, index) => (
                <div
                  key={index}
                  className="w-[70px] h-[70px] sm:w-20 sm:h-20 md:w-[100px] md:h-[100px] relative cursor-pointer shrink-0"
                  onClick={() => setImages(image)}
                >
                  <Image
                    src={image}
                    alt="Thumbnail"
                    fill
                    className="rounded-xl object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 p-3 max-h-[600px] overflow-y-auto">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h1 className="text-[28px] md:text-2xl font-bold">
                  {productItems?.name}
                </h1>
                <p className="text-md md:text-[18px] ">
                  {productItems?.shortDescription}
                </p>
              </div>

              <div className="space-y-0.5">
                <div className="flex flex-col gap-2">
                  {activeVariant?.finalPrice === 0 ? (
                    <span className="text-[20px]  md:text-[35px] font-bold text-[#4EA674]">
                      {currencyFormatter.format(activeVariant?.price ?? 0)}
                    </span>
                  ) : (
                    <div className="flex gap-2 items-center font-bold">
                      <span className="text-[20px] md:text-[35px]  text-[#4EA674]">
                        {currencyFormatter.format(
                          activeVariant?.finalPrice ?? 0,
                        )}
                      </span>
                      <span className="text-[15px] md:text-[18px] text-red-500 line-through">
                        {currencyFormatter.format(activeVariant?.price ?? 0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-5">
                  <div className="flex gap-2 items-center">
                    <span className="text-[18px] font-semibold">
                      Category:{" "}
                    </span>
                    <p className="text-[18px] font-bold">
                      {productItems?.categoryName}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[18px] font-semibold">Stock: </span>
                    <p className="text-[18px] font-bold">
                      {activeVariant?.stockQuantity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="text-[18px] font-semibold">Variants: </div>
                <div className="flex flex-col gap-3">
                  {productItems?.availableAttributes?.map(
                    (variant, attrIndex) => (
                      <div key={variant.name}>
                        <div className="mb-1 text-[18px] font-bold">
                          {variant.name}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {variant.values.map((value) => {
                            const isSelected =
                              selectedVariants[variant.name] === value;

                            const disabled =
                              attrIndex !== 0 &&
                              !isAvailable(
                                productItems?.variants ?? [],
                                selectedVariants,
                                variant.name,
                                value,
                              );

                            return (
                              <label
                                key={value}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md cursor-pointer transition text-sm sm:text-base
                              ${
                                isSelected
                                  ? "border-green-500 bg-green-50 text-green-600"
                                  : "border-gray-300"
                              }
                              ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                              >
                                <input
                                  type="radio"
                                  name={variant.name}
                                  value={value}
                                  checked={isSelected}
                                  disabled={disabled}
                                  onChange={() =>
                                    handleVariantChange(variant.name, value)
                                  }
                                  className="hidden"
                                />
                                {value}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-7">
                  <p className="text-[18px] font-semibold">Quantity:</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 border rounded"
                    >
                      <MdKeyboardArrowDown />
                    </button>
                    <div className="px-3 py-1 border rounded">{quantity}</div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 border rounded"
                      disabled={quantity >= (activeVariant?.stockQuantity ?? 0)}
                    >
                      <MdKeyboardArrowUp />
                    </button>
                  </div>
                </div>

                {activeVariant?.stockQuantity === 0 ? (
                  <Button disabled className="w-full sm:w-[200px] bg-gray-500">
                    Out of Stock
                  </Button>
                ) : (
                  <Button
                    className="w-full sm:w-[200px]"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[20px] font-bold ">Product details:</div>
              <div>{productItems?.description}</div>
            </div>
          </div>
        </div>
      </Card>

      {productItems?.productId && (
        <ProductReview productId={productItems?.productId} />
      )}

      <div className="font-bold text-lg sm:text-xl">Related Products</div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {productItems?.relatedProducts.map(
          (val, index) =>
            index < 5 && <ProductCard key={val.productId} product={val} />,
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/ui/button";
import { useProductDetails } from "@/hooks/product/useProductDetails";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ProductCard } from "./ProductCard";
import { useProductCategory } from "@/hooks/product/useProductCategory";
import { Card } from "../Card/Card";
import { ProductReview } from "./Review/ProductReview";

export interface Variant {
  variantId: number;
  sku: string;
  price: number;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  attributes: Record<string, string | undefined>;
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
  const productItems = useProductDetails(id as string);
  const addToCart = useAddToCart();
  const { token } = useAuth();

  const defaultImage = productItems.data?.images[0]?.imageUrl;
  const [images, setImages] = useState<string | undefined>(defaultImage);
  const displayedImage = images ?? defaultImage;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string | undefined>
  >(() => getDefaultSelectedVariants(productItems.data?.variants));

  if (
    productItems.data?.variants &&
    Object.keys(selectedVariants).length === 0
  ) {
    const defaults = getDefaultSelectedVariants(productItems.data.variants);
    if (Object.keys(defaults).length > 0) {
      setSelectedVariants(defaults);
    }
  }

  const activeVariant = productItems.data?.variants?.find((variant) =>
    Object.entries(selectedVariants).every(
      ([key, value]) => variant.attributes[key] === value,
    ),
  );

  const handleVariantChange = (attributeName: string, value: string) => {
    const variants = productItems.data?.variants ?? [];
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

  if (productItems.isLoading) return <p>Loading product details...</p>;
  if (productItems.isError) return <p>Failed to load product details</p>;

  const imageUrls = productItems.data?.images?.map((img) => img.imageUrl);

  return (
    <div className="w-full px-20 py-10 flex flex-col gap-5">
      <Card className="p-0">
        <div className="grid grid-cols-2 gap-3 py-5">
          <div className="flex flex-col gap-5 px-5 py-8">
            <div className="max-w-[600px] h-[400px] relative">
              <Image
                src={displayedImage || ""}
                alt="Product"
                fill
                className="rounded-xl object-cover"
                unoptimized
              />
            </div>

            <div className="flex justify-center gap-3 border-t-2 pt-2">
              {imageUrls?.map((image, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[100px] relative cursor-pointer"
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

          <div className="p-4 flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold">{productItems.data?.name}</h1>
              <p className="text-lg">{productItems.data?.description}</p>
            </div>

            <div>
              <span className="text-3xl font-bold text-[#4EA674]">
                Rs. {activeVariant?.price}
              </span>
              <div className="flex justify-between text-lg font-bold">
                <span>
                  <span className="font-normal">Category: </span>
                  {productItems.data?.categoryName}
                </span>
                <span>
                  <span className="font-normal">Stock: </span>
                  {activeVariant?.stockQuantity}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-bold text-lg">Variants</div>

              {productItems.data?.availableAttributes?.map(
                (variant, attrIndex) => (
                  <div key={variant.name}>
                    <div className="mb-1 font-medium">{variant.name}</div>
                    <div className="flex gap-2 flex-wrap">
                      {variant.values.map((value) => {
                        const isSelected =
                          selectedVariants[variant.name] === value;

                        const disabled =
                          attrIndex !== 0 &&
                          !isAvailable(
                            productItems.data?.variants ?? [],
                            selectedVariants,
                            variant.name,
                            value,
                          );

                        return (
                          <label
                            key={value}
                            className={`px-4 py-2 border rounded-md cursor-pointer transition
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

            <div className="flex flex-col gap-3">
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

              {activeVariant?.stockQuantity === 0 ? (
                <Button disabled className="w-[200px] bg-gray-500">
                  Out of Stock
                </Button>
              ) : (
                <Button className="w-[200px]" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {productItems.data?.productId && (
        <ProductReview productId={productItems.data?.productId} />
      )}

      <div className="font-bold text-xl">Related Products</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productItems?.data?.relatedProducts.map(
          (val, index) =>
            index < 5 && <ProductCard key={val.productId} product={val} />,
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

"use client";
import Image from "next/image";
import { Card } from "../Card/Card";
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

export interface Variant {
  variantId: number;
  sku: string;
  price: number;
  stockQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  attributes: {
    size?: string;
    Color?: string;
  };
}

export interface VariantAttributes {
  name: string;
  values: [];
}
interface Product {
  productId: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  stockQuantity: number;
  primaryImageUrl: string;
  isActive: boolean;
  categoryId: number;
  sku: string;
  variants?: Variant[];
  availableAttributes?: VariantAttributes[];
}

const ProductDetails = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const [quantity, setQuantity] = useState(1);
  const searchParams = useParams();
  const slug = searchParams.id;
  const productItems = useProductDetails((slug as string) || "");

  const defaultImage = productItems?.data?.images?.[0]?.imageUrl;
  const [images, setImages] = useState(defaultImage);

  const displayedImage = images ?? defaultImage;
  const currentCategoryId = productItems?.data?.categoryId;
  const prod = useProductCategory(currentCategoryId || 0);
  const addToCart = useAddToCart();

  const handleSubQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else setQuantity(quantity - 1);
  };

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const { token } = useAuth();
  const handleAddToCart = ({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }) => {
    if (token) {
      addToCart.mutate({
        productId: productId,
        quantity: quantity,
      });
    } else {
      toast.message("Login to add to cart");
    }
  };

  if (productItems.isLoading) return <p>Loading product details...</p>;
  if (productItems.isError) return <p>Failed to load product details</p>;

  const imageUrls = productItems.data?.images?.map((img) => img.imageUrl);

  return (
    <div className="w-full px-20 py-10 flex flex-col gap-5">
      <Card key={productItems.data?.productId} className="p-0">
        <div className="grid grid-cols-2 gap-3 py-5">
          <div className="flex gap-5 flex-col px-5 py-8">
            <div className="max-w-[600px] h-[400px] relative">
              <Image
                src={displayedImage || ""}
                alt="Image"
                fill
                className="w-full h-full rounded-xl object-cover"
                unoptimized
              />
            </div>

            <div className="flex justify-center  gap-3 border-t-2 pt-2">
              {imageUrls?.map((image, index) => (
                <div
                  key={index}
                  className=" w-[100px] h-[100px] relative"
                  onClick={() => setImages(image)}
                >
                  <Image
                    src={image || ""}
                    alt="Image"
                    fill
                    className="w-full h-full rounded-xl object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <div>
              <div className="font-bold text-3xl">
                {productItems.data?.name}
              </div>
              <div className="font-normal text-[18px]">
                {productItems.data?.description}
              </div>
            </div>
            <div>
              <div>
                <span className="text-[30px] text-[#4EA674] font-bold">
                  Rs. {productItems.data?.price ?? selectedVariants?.price}
                </span>
                {/* &nbsp;&nbsp;&nbsp;
                  <span className="line-through text-[25px] text-[red] font-medium">
                    $ {product.originalPrice}
                  </span> */}
              </div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-[18px]">
                  <span className="font-normal">Category: </span>
                  {productItems.data?.categoryName}
                </div>
                <div className="font-bold text-[18px]">
                  <span className="font-normal">Stock Quantity: </span>
                  {selectedVariants?.stockQuantity ??
                    productItems.data?.stockQuantity}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-bold text-[18px]">Variants</div>

              {productItems.data?.availableAttributes.map((variant) => (
                <div key={variant.name}>
                  <div className="mb-1 font-medium">{variant.name}</div>

                  <div className="flex gap-2 flex-wrap">
                    {variant.values.map((value: string) => {
                      const isSelected =
                        selectedVariants[variant.name] === value;

                      return (
                        <label
                          key={value}
                          className={`flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer transition
                ${
                  isSelected
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-300"
                }`}
                        >
                          <input
                            type="radio"
                            name={variant.name}
                            value={value}
                            checked={isSelected}
                            onChange={() =>
                              setSelectedVariants((prev) => ({
                                ...prev,
                                [variant.name]: value,
                              }))
                            }
                            className="hidden"
                          />
                          {value}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center mt-3">
                <button
                  className="p-1 rounded border flex justify-center items-center"
                  onClick={handleSubQuantity}
                >
                  <MdKeyboardArrowDown />
                </button>
                <div className="px-3 py-1 border rounded">{quantity}</div>
                <button
                  className="p-1 rounded border flex justify-center items-center"
                  onClick={handleAddQuantity}
                  disabled={quantity >= (productItems.data?.stockQuantity ?? 0)}
                >
                  <MdKeyboardArrowUp />
                </button>
              </div>
              {productItems.data?.stockQuantity === 0 ? (
                <Button className="w-[200px] bg-gray-500 text-white" disabled>
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-[200px]"
                  onClick={() =>
                    handleAddToCart({
                      productId: productItems?.data?.productId || 1,
                      quantity: quantity,
                    })
                  }
                >
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div>Related Products</div>
      <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productItems.data?.categoryId === currentCategoryId &&
          (prod.data?.items || []).map(
            (product: Product, index) =>
              index < 5 && (
                <ProductCard key={product.productId} product={product} />
              ),
          )}
      </div>
    </div>
  );
};

export default ProductDetails;

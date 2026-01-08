import { useProductDetails } from "@/hooks/product/useProductDetails";
import { Card } from "../Card/Card";
import Image from "next/image";
import { Button } from "@/ui/button";
import { Dialog } from "../Dialog/Dialog";
import { useEffect, useState } from "react";
import { DialogClose, DialogTitle } from "@/ui/dialog";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { toast } from "sonner";
import { Variant } from "../Product/ProductDetails";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/contexts/AuthContext";
import { useAddWishlist } from "@/hooks/wishlist/useAddWishlist";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { WishlistItem } from "../TrendingProduct/component/TrendingProductCard";
import Link from "next/link";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export const WishlistProductCard = ({
  productId,
}: {
  wishlistId: number;
  productId: number;
}) => {
  const { data } = useProductDetails(String(productId));
  const product = data;
  const stockValue = 20;
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCart();
  const { token } = useAuth();
  const addMutate = useAddWishlist();
  const deleteMutate = useDeleteWishlist();
  const wishlists = useFetchWishlist();
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string | undefined>
  >({});

  const activeVariant = product?.variants?.find((variant) =>
    Object.entries(selectedVariants).every(
      ([key, value]) => variant.attributes[key] === value,
    ),
  );

  const handleAddToCart = (productId: number, quantity: number) => {
    if (token) {
      addToCart.mutate({
        variantId: productId,
        quantity: quantity,
      });
    } else {
      toast.message("Login to add to cart");
    }
  };

  const handleIncrease = () => {
    if (quantity < stockValue) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      return 1;
    }
    setQuantity(quantity - 1);
  };

  const wishlistItems = Array.isArray(wishlists?.data)
    ? wishlists.data
    : (wishlists?.data?.items ?? []);

  const wishedIds = new Set<number>(
    wishlistItems
      .map((wishlist: WishlistItem) => Number(wishlist.productId))
      .filter((id: number) => !Number.isNaN(id)),
  );

  const wishlistItemForProduct = wishlistItems.find(
    (w: WishlistItem) => Number(w.productId) === product?.productId,
  );
  const wishlistIdForProduct = wishlistItemForProduct?.wishlistId;

  const handleAddWishlist = (variantId?: number) => {
    addMutate.mutate(Number(variantId));
  };

  const handleDeleteWishlist = (wishlistId?: number) => {
    deleteMutate.mutate(Number(wishlistId));
  };

  const isAvailable = (
    variants: Variant[],
    selectedAttributes: Record<string, string | undefined>,
    attrName: string,
    value: string,
  ) => {
    const tempSelection = { ...selectedAttributes, [attrName]: value };
    return variants.some((v) =>
      Object.entries(tempSelection).every(
        ([key, val]) => !val || v.attributes[key] === val,
      ),
    );
  };

  useEffect(() => {
    if (!product?.variants) return;
    const defaultVariant = product.variants.find((v) => v.isDefault) ?? null;
    setSelectedVariants(
      (defaultVariant?.attributes ?? {}) as Record<string, string | undefined>,
    );
  }, [product]);

  const handleVariantChange = (attributeName: string, value: string) => {
    const variants = product?.variants ?? [];
    const nextSelection = { ...selectedVariants, [attributeName]: value };

    Object.keys(nextSelection).forEach((key) => {
      if (key === attributeName) return;
      const otherValue = nextSelection[key];
      if (!otherValue) return;

      const compatibleVariant = variants.find(
        (v) =>
          v.attributes[attributeName] === value &&
          v.attributes[key] === otherValue,
      );

      if (!compatibleVariant) {
        const validVariant = variants.find(
          (v) => v.attributes[attributeName] === value,
        );
        nextSelection[key] = validVariant?.attributes[key];
      }
    });

    setSelectedVariants(nextSelection);
  };

  const defaultVariantId =
    product?.variants?.find((v) => v.isDefault === true)?.variantId ?? null;
  return (
    <Card
      className="p-3 w-full max-w-[285px] border-0 shadow-none flex flex-col justify-between h-[400px] md:h-[380px] "
      key={product?.productId}
      rootClassName="py-0 border shadow-xl max-w-[285px]"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full h-[185px] relative ">
          <Image
            src={`${product?.images[0]?.imageUrl}`}
            alt={product?.name || ""}
            fill
            className="w-full h-full object-cover rounded-[12px]"
            unoptimized
          />
          {product?.stockQuantity === 0 && (
            <div className="absolute top-3 left-3 px-1 rounded-sm text-white bg-gray-500 font-bold flex justify-center items-center cursor-pointer">
              Out of Stock
            </div>
          )}
          <div className="absolute top-3 right-3 rounded-full w-6 h-6 shadow-md flex justify-center items-center cursor-pointer bg-white">
            {wishedIds.has(product?.productId || 0) ? (
              <IoIosHeart
                size={16}
                className="text-red-600"
                onClick={() =>
                  handleDeleteWishlist(Number(wishlistIdForProduct))
                }
              />
            ) : (
              <IoIosHeartEmpty
                size={16}
                className="text-gray-400"
                onClick={() => handleAddWishlist(Number(defaultVariantId))}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[20px] font-medium line-clamp-1">
            {product?.name}
          </div>
          {product?.shortDescription && (
            <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
              {product.shortDescription}
            </div>
          )}
          {/* <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < product.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews})
            </span>
          </div> */}
          <div>
            <span className="text-[18px] text-[#4EA674] font-bold">
              Rs. {product?.price}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="line-through text-[15px] text-[red] font-medium">
              Rs. {product?.price}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-row items-center mt-2">
        <Link href={`/product/id/${product?.slug}`}>
          <div className="text-[14px] text-[#6467F2] font-normal">
            View Details
          </div>
        </Link>
        {product?.stockQuantity === 0 ? (
          <Button
            className="px-5 py-4 text-[14px] font-bold bg-gray-500 text-white rounded-[200px]"
            disabled
          >
            Out of stock
          </Button>
        ) : (
          <Dialog
            triggerText={
              <Button
                className="px-5 py-4 text-[14px] font-bold bg-white border border-[#4EA674] text-[#4EA674] rounded-[200px]"
                onPointerDownCapture={() => setQuantity(1)}
              >
                Add to cart
              </Button>
            }
          >
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-[18px] font-bold">
                Cart Information
              </DialogTitle>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-5 w-full">
                  <div className="w-[100px] h-[100px] relative">
                    <Image
                      src={product?.images[0]?.imageUrl || "/default.jpg"}
                      alt={product?.name || ""}
                      fill
                      className="object-cover rounded-[12px]"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="text-[25px] font-bold">{product?.name}</div>
                    <div className="text-[16px] line-clamp-2">
                      {product?.shortDescription}
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex gap-2.5 items-center">
                    <button
                      className="p-1 rounded border disabled:opacity-50"
                      onClick={() => handleDecrease()}
                    >
                      <MdKeyboardArrowDown />
                    </button>
                    <div className="px-3 py-1 border rounded">{quantity}</div>
                    <button
                      className="p-1 rounded border"
                      onClick={() => handleIncrease()}
                    >
                      <MdKeyboardArrowUp />
                    </button>
                  </div>
                  <div className="text-sm italic">Stock: {stockValue} </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="font-bold text-[18px]">Variants</div>

                  {product?.availableAttributes?.map((variant, attrIndex) => (
                    <div key={variant.name}>
                      <div className="mb-1 font-medium">{variant.name}</div>

                      <div className="flex gap-2 flex-wrap">
                        {variant.values.map((value: string) => {
                          const isSelected =
                            selectedVariants[variant.name] === value;
                          const disabled =
                            attrIndex === 0
                              ? false
                              : !isAvailable(
                                  product?.variants ?? [],
                                  selectedVariants,
                                  variant.name,
                                  value,
                                );

                          return (
                            <label
                              key={value}
                              className={`flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer transition
                  ${
                    isSelected
                      ? "border-green-500 bg-green-50 text-green-600"
                      : "border-gray-300"
                  }
                  ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                            >
                              <input
                                type="radio"
                                name={variant.name}
                                value={value}
                                disabled={disabled}
                                checked={isSelected}
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
                  ))}
                </div>
              </div>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    handleAddToCart(activeVariant?.variantId || 0, quantity);
                  }}
                  className="px-4 py-2 bg-[#4EA674] text-white"
                >
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </Dialog>
        )}
      </div>
    </Card>
  );
};

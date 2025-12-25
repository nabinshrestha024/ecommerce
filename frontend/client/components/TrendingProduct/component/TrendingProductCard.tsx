import { Card } from "@/components/Card/Card";
import { Button } from "@/ui/button";
import { ProductDatas } from "./ProductData.import";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useProduct } from "@/hooks/product/useProduct";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useAddWishlist } from "@/hooks/wishlist/useAddWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";

export interface WishlistItem {
  productId: number;
  primaryImageUrl: string;
  name: string;
  shortDescription: string;
  price: number;
  id: number;
}

export type wishlistData = number;

export const TrendingProductCard = () => {
  const { data, isLoading, isError } = useProduct();
  const addMutate = useAddWishlist();
  const deleteMutate = useDeleteWishlist();
  const wishlists = useFetchWishlist();
  const addToCart = useAddToCart();
  const { token } = useAuth();

  const handleAddToCart = (productId: number) => {
    if (token) {
      addToCart.mutate({
        productId: productId,
        quantity: 1,
      });
    } else {
      toast.message("Login to add to cart");
    }
  };

  const wishlistItems = Array.isArray(wishlists?.data)
    ? wishlists.data
    : (wishlists?.data?.items ?? []);

  const wishedIds = new Set<number>(
    wishlistItems
      .map((wishlist: WishlistItem) => Number(wishlist.productId))
      .filter((id) => !Number.isNaN(id)),
  );

  const handleAddWishlist = (productId: wishlistData) => {
    console.log(productId);
    addMutate.mutate(productId);
  };

  const handleDeleteWishlist = (productId: wishlistData) => {
    console.log(productId);
    deleteMutate.mutate(productId);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>An Error Occured</div>
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.items?.map(
        (product, index) =>
          index < 3 && (
            <Card
              key={product.productId}
              className="p-3 w-full max-w-[285px] border-0 shadow-none"
              rootClassName="py-0 border shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full h-[185px] relative">
                  <Image
                    src={product.primaryImageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-[12px]"
                  />
                  <div className="absolute top-3 right-3 rounded-full w-6 h-6 shadow-sm flex justify-center items-center cursor-pointer">
                    {wishedIds.has(product.productId) ? (
                      <IoIosHeart
                        size={16}
                        className="text-red-600"
                        onClick={() => handleDeleteWishlist(product.productId)}
                      />
                    ) : (
                      <IoIosHeartEmpty
                        size={16}
                        className="text-gray-400"
                        onClick={() => handleAddWishlist(product.productId)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-full h-[185px] relative">
                    <Image
                      src={products[randomNumber].image}
                      alt="image"
                      fill
                      className="w-full h-full object-cover rounded-[12px]"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-white w-6 h-6 shadow-sm flex justify-center items-center">
                      <IoIosHeartEmpty />
                    </div>
                  </div>

<<<<<<< HEAD
                  <div className="flex flex-col gap-2">
                    <div className="text-[20px] font-medium line-clamp-1">
                      {products[randomNumber].name}
                    </div>
                    <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
                      {products[randomNumber].description}
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < products[randomNumber].rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <div>
                      <span className="text-[14px] text-[#4EA674] font-bold">
                        $ {products[randomNumber].price}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span className="line-through text-[12px] text-[red] font-medium">
                        $ {products[randomNumber].originalPrice}
                      </span>
                    </div>
=======
                  <div className="text-[16px] text-[#00000099]/60 line-clamp-2">
                    {product.shortDescription}
                  </div>

                  <div className="flex items-center mb-2">
                    {[...Array(5)]?.map((_, i) => (
                      <Star key={i} size={16} className="text-gray-300" />
                    ))}
                  </div>

                  <div className="text-[14px] text-[#4EA674] font-bold">
                    Rs {product.price}
>>>>>>> b67460de61aa26164c515cb9b53240ef78013712
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center mt-2">
                  <Link href={`/product/id/${products[randomNumber].sslug}`}>
                    <div className="text-[14px] text-[#6467F2] font-normal">
                      View Details
                    </div>
                  </Link>

                  <Button className="px-5 py-4 text-[14px] font-bold leading-3 bg-white border border-[#4EA674] text-[#4EA674]  rounded-[200px] hover:bg-[#fffcfc]">
                    Add to cart
                  </Button>
                </div>
              </Card>
            )
          );
        })}
      </div>
    </div>
  );
};

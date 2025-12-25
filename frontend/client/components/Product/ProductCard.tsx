import { Button } from "@/ui/button";
import Image from "next/image";
import { Card } from "../Card/Card";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useAddWishlist } from "@/hooks/wishlist/useAddWishlist";
import { useDeleteWishlist } from "@/hooks/wishlist/useDeleteWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import {
  wishlistData,
  WishlistItem,
} from "../TrendingProduct/component/TrendingProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  sslug: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
<<<<<<< HEAD
=======
  const addToCart = useAddToCart();
  const { token } = useAuth();
  const addMutate = useAddWishlist();
  const deleteMutate = useDeleteWishlist();
  const wishlists = useFetchWishlist();

  const handleAddToCart = (productId: number) => {
    if (token) {
      addToCart.mutate({ productId: productId, quantity: 1 });
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

>>>>>>> b67460de61aa26164c515cb9b53240ef78013712
  return (
    <Card
      className="p-3 w-full max-w-[285px] border-0 shadow-none"
      key={product.id}
      rootClassName="py-0 border shadow-xl"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full h-[185px] relative ">
          <Image
            src={product.image}
            alt="image"
            fill
            className="w-full h-full object-cover rounded-[12px]"
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
          <div className="text-[20px] font-medium line-clamp-1">
            {product.name}
          </div>
          <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
            {product.description}
          </div>
          <div className="flex items-center mb-2">
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
          </div>
          <div>
            <span className="text-[14px] text-[#4EA674] font-bold">
              $ {product.price}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="line-through text-[12px] text-[red] font-medium">
              $ {product.originalPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row items-center mt-2">
        <Link href={`/product/id/${product.sslug}`}>
          <div className="text-[14px] text-[#6467F2] font-normal">
            View Details
          </div>
        </Link>

        <Button className="px-5 py-4 text-[14px] font-bold leading-3 bg-white border border-[#4EA674] text-[#4EA674]  rounded-[200px] hover:bg-[#fffcfc]">
          Add to cart
        </Button>
      </div>
    </Card>
  );
};

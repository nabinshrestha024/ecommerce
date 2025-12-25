import { Button } from "@/ui/button";
import Image from "next/image";
import { Card } from "../Card/Card";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { useAddToCart } from "@/hooks/cart/useAddToCart";

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
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useAddToCart();
  return (
    <Card
      className="p-3 w-full max-w-[285px] border-0 shadow-none"
      key={product.productId}
      rootClassName="py-0 border shadow-xl"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full h-[185px] relative ">
          <Image
            src={product.primaryImageUrl}
            alt={product.name}
            fill
            className="w-full h-full object-cover rounded-[12px]"
          />
          <div className="absolute top-3 right-3 rounded-full bg-white w-6 h-6 shadow-sm flex justify-center items-center">
            <IoIosHeartEmpty />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[20px] font-medium line-clamp-1">
            {product.name}
          </div>
          <div className="text-[16px] font-normal leading-[22px] text-[#00000099]/60 line-clamp-2">
            {product.shortDescription}
          </div>
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
            <span className="text-[14px] text-[#4EA674] font-bold">
              $ {product.price}
            </span>
            &nbsp;&nbsp;&nbsp;
            <span className="line-through text-[12px] text-[red] font-medium">
              $ {product.price}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row items-center mt-2">
        <Link href={`/product/id/${product.slug}`}>
          <div className="text-[14px] text-[#6467F2] font-normal">
            View Details
          </div>
        </Link>

        <Button
          className="px-5 py-4 text-[14px] font-bold leading-3 bg-white border border-[#4EA674] text-[#4EA674]  rounded-[200px] hover:bg-[#fffcfc]"
          onClick={() =>
            addToCart.mutate({ productId: product.productId, quantity: 1 })
          }
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
};

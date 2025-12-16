import { Button } from "@/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

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
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-64 object-cover"
        />
        <Button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
          <Heart size={20} className="text-gray-500" />
        </Button>
        {product.discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-5">
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

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>

        <Button className="w-full bg-[#4EA674] hover:bg-[#3d8a5d] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <ShoppingCart size={20} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

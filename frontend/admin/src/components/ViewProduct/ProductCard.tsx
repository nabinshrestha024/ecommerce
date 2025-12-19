import { Card } from "../Card/Card";
import { IoIosHeartEmpty } from "react-icons/io";
import { Star } from "lucide-react";

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
    <Card
      className="p-3 w-full max-w-[285px] border-0 shadow-none"
      key={product.id}
      cardClassName="py-0 border shadow-xl"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full h-[185px]">
          <img
            src={product.image}
            alt="image"
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
      <div className="flex justify-between items-center mt-2"></div>
    </Card>
  );
};

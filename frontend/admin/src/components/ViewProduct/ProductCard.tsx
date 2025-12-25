import { Card } from "../Card/Card";

interface Product {
  productId: number;
  categoryId: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  sku: string;
  isActive: boolean;
  price: number;
  originalPrice?: number;
  discount?: number;
  primaryImageUrl: string;
  rating?: number;
  reviews?: number;
  stockOuantity?: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log("card", product);
  return (
    <Card
      className="p-3 w-full max-w-[285px] border-0 shadow-none"
      key={product.productId}
      cardClassName="py-0 border shadow-xl"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full h-[185px] relative">
          <img
            src={product.primaryImageUrl}
            alt="image"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[20px] font-medium line-clamp-1">
            {product.name}
          </div>
          <div className="text-[16px] font-normal leading-[22px] line-clamp-2">
            {product.shortDescription}
          </div>
          <span className="text-[14px] text-[#4EA674] font-bold">
            $ {product.price}
          </span>
        </div>
      </div>
    </Card>
  );
};

"use client";
import Image from "next/image";
import { products, ProductType } from "./Product.import";
import { Card } from "../Card/Card";
import { useParams } from "next/navigation";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useState } from "react";
import { Button } from "@/ui/button";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const id = useParams().id;
  console.log(id);

  const filteredData = products.filter((val) => val.sslug === id);

  const handleSubQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="w-full p-20">
      {filteredData.map((product: ProductType) => (
        <Card key={product.id} className="p-0">
          <div className="grid grid-cols-2 gap-3 py-5">
            <div className="px-5 py-8">
              <div className="max-w-[600px] h-[400px] relative">
                <Image
                  src={product.image}
                  alt="Image"
                  fill
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div>
                <div className="font-bold text-3xl">{product.name}</div>
                <div className="font-normal text-[18px]">
                  {product.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ullam sit culpa optio vero nostrum molestias
                  nam pariatur quam, fugit reiciendis omnis iste, a commodi.
                  Eaque voluptas illum hic cupiditate omnis! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Suscipit, minus! Quas
                  dolorem, quaerat modi qui deleniti provident eligendi delectus
                  fuga aliquid accusantium dolore molestias fugit tenetur
                  deserunt. Quasi, officiis eaque.q
                </div>
              </div>
              <div>
                <div>
                  <span className="text-[30px] text-[#4EA674] font-bold">
                    $ {product.price}
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="line-through text-[25px] text-[red] font-medium">
                    $ {product.originalPrice}
                  </span>
                </div>
                <div className="font-normal text-[20px]">
                  <span className="font-bold">Category: </span>
                  {product.category}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center mt-3">
                  <div
                    className="px-3 py-2 bg-[#4EA674] rounded-lg w-10 flex justify-center items-center"
                    onClick={handleSubQuantity}
                  >
                    <RiSubtractFill color="white" />
                  </div>
                  {quantity}
                  <div
                    className="px-3 py-2 bg-[#4EA674] rounded-lg w-10 flex justify-center items-center"
                    onClick={handleAddQuantity}
                  >
                    <RiAddFill color="white" />
                  </div>
                </div>
                <Button className="w-[200px]">Add to cart</Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductDetails;

"use client";
import Image from "next/image";
import { Card } from "../Card/Card";
import { useParams } from "next/navigation";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useState } from "react";
import { Button } from "@/ui/button";
import { useProductDetails } from "@/hooks/product/useProductDetails";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const searchParams = useParams();
  console.log(searchParams.id);
  const slug = searchParams.id;
  const productItems = useProductDetails((slug as string) || "");
  console.log(productItems);
  const handleSubQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };
  if (productItems.isLoading) return <p>Loading product details...</p>;
  if (productItems.isError) return <p>Failed to load product details</p>;
  return (
    <div className="w-full px-20 py-10">
      <Card key={productItems.data?.productId} className="p-0">
        <div className="grid grid-cols-2 gap-3 py-5">
          <div className="px-5 py-8">
            <div className="max-w-[600px] h-[400px] relative">
              <Image
                src={productItems.data?.images[0].url || ""}
                alt="Image"
                fill
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <div>
              <div className="font-bold text-3xl">
                {productItems.data?.name}
              </div>
              <div className="font-normal text-[18px]">
                {productItems.data?.shortDescription} Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ullam sit culpa optio vero nostrum
                molestias nam pariatur quam, fugit reiciendis omnis iste, a
                commodi. Eaque voluptas illum hic cupiditate omnis! Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Suscipit, minus!
                Quas dolorem, quaerat modi qui deleniti provident eligendi
                delectus fuga aliquid accusantium dolore molestias fugit tenetur
                deserunt. Quasi, officiis eaque.q
              </div>
            </div>
            <div>
              <div>
                <span className="text-[30px] text-[#4EA674] font-bold">
                  $ {productItems.data?.price}
                </span>
                {/* &nbsp;&nbsp;&nbsp;
                  <span className="line-through text-[25px] text-[red] font-medium">
                    $ {product.originalPrice}
                  </span> */}
              </div>
              <div className="font-normal text-[20px]">
                <span className="font-bold">Category: </span>
                {productItems.data?.categoryId}
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
    </div>
  );
};

export default ProductDetails;

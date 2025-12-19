"use client";

import { ProductDisplay } from "@/components/Product/ProductDisplay";
import { useParams } from "next/navigation";

export default function Page() {
  const { category } = useParams();
  return <ProductDisplay category={category as string} />;
}

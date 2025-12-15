import { Advertisement } from "@/components/Advertisement/Advertisement";
import { BestSelling } from "@/components/BestSelling/BestSelling";
import { Deal } from "@/components/Deal/Deal";
import { Explore } from "@/components/Explore/Explore";
import { Footer } from "@/components/Footer/Footer";
import { ProductSlider } from "@/components/ProductSlider/ProductSlider";
import { Review } from "@/components/Review/Review";
import { TrendingProduct } from "@/components/TrendingProduct/TrendingProduct";

export default function Home() {
  return (
    <div>
      <ProductSlider />
      <Advertisement />
      <TrendingProduct />
      <Explore />
      <BestSelling />
      <Deal />
      <Review />
      <Footer />
    </div>
  );
}

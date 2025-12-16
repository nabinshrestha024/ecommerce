import { Carousel } from "../carousel/Carousel";

export const ProductSlider = () => {
  return (
    <Carousel
      rootClassName="p-0 shadow-none"
      contentClassName="p-0 border-0"
      items={[
        <img
          key="electronics"
          src="/ProductSlider/electronics.jpg"
          alt="Electronics"
          className="w-full h-64 object-cover rounded-lg"
        />,
        <img
          key="groceries"
          src="/ProductSlider/groceries.jpg"
          alt="Groceries"
          className="w-full h-64 object-cover rounded-lg"
        />,
        <img
          key="shoes"
          src="/ProductSlider/shoes.jpg"
          alt="Shoes"
          className="w-full h-64 object-cover rounded-lg"
        />,
        <img
          key="sweater"
          src="/ProductSlider/sweater.jpg"
          alt="Sweater"
          className="w-full h-64 object-cover rounded-lg"
        />,
      ]}
    />
  );
};

import { Button } from "@/ui/button";

export const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full pt-0 pb-4 sm:pb-6 md:pb-8 gap-4">
      <div className="font-bold text-[22px] leading-[100%] tracking-[0.5%] shrink-0">
        Add New Product
      </div>
      <div className="flex flex-row gap-2 sm:gap-4 shrink-0 w-full lg:w-auto">
        <Button
          variant="default"
          className="h-12 flex-1 sm:flex-initial"
          type="submit"
          form="productForm"
        >
          <span className="hidden sm:inline">Publish Product</span>
          <span className="sm:hidden">Publish</span>
        </Button>
      </div>
    </div>
  );
};

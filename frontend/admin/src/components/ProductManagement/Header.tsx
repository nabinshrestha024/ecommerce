import { CirclePlus, Save } from "lucide-react";
import { SearchProduct } from "./SearchProdcut";
import { Button } from "@/ui/button";

export const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full pt-0 pb-4 sm:pb-6 md:pb-8 gap-4">
      <div className="font-bold text-[22px] leading-[100%] tracking-[0.5%] shrink-0">
        Add New Product
      </div>
      <div className="w-full lg:flex-1 lg:max-w-md">
        <SearchProduct
          placeholder="Search Products..."
          className="w-full h-12"
        />
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
        <button className="flex flex-row justify-center items-center gap-2 px-2 sm:px-4 py-1.5 h-12 rounded-md border font-bold tracking-[-2%] leading-[100%] text-[15px] border-gray-300 hover:bg-gray-50 flex-1 sm:flex-initial">
          <Save size={16} />
          <span className="hidden sm:inline">Save to draft</span>
          <span className="sm:hidden">Draft</span>
        </button>
        <button className="flex justify-center items-center rounded-md border border-[#E5E7EB] h-12 w-12 hover:bg-gray-50 shrink-0">
          <CirclePlus size={24} />
        </button>
      </div>
    </div>
  );
};

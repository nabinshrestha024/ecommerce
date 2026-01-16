import { ProductTable } from "@/components/Product/ProductTable";
import { Button } from "@/ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export const Product = () => {
  return (
    <div className="space-y-5 p-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, update, and manage products across your store.
          </p>
        </div>
        <Link to="/product-management">
          <Button className="px-5 py-4 text-[15px] font-bold leading-3 bg-[#4EA674] text-white  rounded-lg hover:bg-[#4EA674]">
            <MdAddCircleOutline className="text-white text-[24px]" />
            Add Product
          </Button>
        </Link>
      </div>
      <ProductTable />
    </div>
  );
};

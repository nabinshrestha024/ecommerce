import { BasicDetails } from "@/components/ProductManagement/BasicDetails";
import { SearchProduct } from "@/components/ProductManagement/SearchProdcut";
import { UploadProductDetails } from "@/components/ProductManagement/UploadProductDetails";
import { Button } from "@/ui/button";
import { Save } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

export const ProductManagement = () => {
  const methods = useForm();
  const handleFormSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="px-5 pt-5 pb-8">
      <div className="flex justify-between items-center w-full px-5 pt-5 pb-8 gap-4">
        <div className="font-bold text-[22px] leading-[100%] tracking-[0.5%] shrink-0">
          Add New Product
        </div>
        <div className="flex-1 max-w-md">
          <SearchProduct
            placeholder="Search Products..."
            className="w-full h-12"
          />
        </div>
        <div className="flex flex-row gap-4 shrink-0">
          <Button variant="default" className="h-12">
            Publish Product
          </Button>
          <button className="flex flex-row justify-center items-center gap-2 px-4 py-1.5 h-12 rounded-md border font-bold tracking-[-2%] leading-[100%] text-[15px] border-gray-300 hover:bg-gray-50">
            <Save size={16} /> Save to draft
          </button>
          <button className="flex justify-center items-center rounded-md border border-[#E5E7EB] h-12 w-12 hover:bg-gray-50">
            <CirclePlus size={24} />
          </button>
        </div>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="w-full"
        >
          <div className="grid grid-cols-2 gap-5 w-full">
            <BasicDetails />
            <UploadProductDetails />
          </div>
          <div className="flex flex-row justify-self-end items-center gap-4 mt-4 shrink-0 ">
            <Button variant="default" className="h-12" type="submit">
              Publish Product
            </Button>
            <button className="flex flex-row justify-center items-center gap-2 px-4 py-1.5 h-12 rounded-md border font-bold tracking-[-2%] leading-[100%] text-[15px] border-gray-300 hover:bg-gray-50">
              <Save size={16} /> Save to draft
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

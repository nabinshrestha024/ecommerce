import { BasicDetails } from "@/components/ProductManagement/BasicDetails";
import { Header } from "@/components/ProductManagement/Header";
import { UploadProductDetails } from "@/components/ProductManagement/UploadProductDetails";
import { Button } from "@/ui/button";
import { Save } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

export const ProductManagement = () => {
  const methods = useForm();
  const handleFormSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="px-2 sm:px-3 md:px-5 pt-3 md:pt-5 pb-6 md:pb-8 w-full max-w-full">
      <div className="pt-5 pb-2 sm:pb-4">
        <Header />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3 md:gap-5 w-full">
            <BasicDetails />
            <UploadProductDetails />
          </div>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-end items-stretch sm:items-center gap-3 md:gap-4 mt-3 md:mt-4">
            <Button
              variant="default"
              className="h-12 w-full sm:w-auto"
              type="submit"
            >
              Publish Product
            </Button>
            <button className="flex flex-row justify-center items-center gap-2 px-4 py-1.5 h-12 rounded-md border font-bold tracking-[-2%] leading-[100%] text-[15px] border-gray-300 hover:bg-gray-50 w-full sm:w-auto">
              <Save size={16} /> Save to draft
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

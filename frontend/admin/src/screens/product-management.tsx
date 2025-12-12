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
    <div className="px-5 pt-5 pb-8">
      <Header />
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

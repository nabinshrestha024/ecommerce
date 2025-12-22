import { BasicDetails } from "@/components/ProductManagement/BasicDetails";
import { Header } from "@/components/ProductManagement/Header";
import { UploadProductDetails } from "@/components/ProductManagement/UploadProductDetails";
import { Button } from "@/ui/button";
import { Save } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "@/components/ProductManagement/schema/ProductForm.zod";
export const ProductManagement = () => {
  const methods = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      taxIncluded: "yes",
      highlightFeatured: false,
    },
    shouldUnregister: true,
    mode: "all",
  });
  const handleFormSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("Name", data.productName);
    formData.append("Description", data.description || "");
    formData.append("ShortDescription", data.shortDescription || "");
    formData.append("Price", String(data.productPrice));
    if (data.productCategories) {
      formData.append("CategoryId", String(data.productCategories));
    }
    if (data.stockQuantity != null) {
      formData.append("StockQuantity", String(data.stockQuantity));
    }

    const files: FileList | undefined = data.images;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => formData.append("images", file));
    }
    if (typeof data.primaryIndex === "number") {
      formData.append("primaryIndex", String(data.primaryIndex));
    }
    console.log("FormData ready with images and fields.");
    console.log(files);
  };

  return (
    <div className="px-2 sm:px-3 md:px-5 pt-3 md:pt-5 pb-6 md:pb-8 w-full max-w-full">
      <div className="pt-5 pb-2 sm:pb-4">
        <Header />
      </div>
      <FormProvider {...methods}>
        <form
          id="productForm"
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

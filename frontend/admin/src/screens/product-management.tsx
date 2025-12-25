import { BasicDetails } from "@/components/ProductManagement/BasicDetails";
import { Header } from "@/components/ProductManagement/Header";
import { UploadProductDetails } from "@/components/ProductManagement/UploadProductDetails";
import { Button } from "@/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema } from "@/components/ProductManagement/schema/ProductForm.zod";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useRef } from "react";
import { toast } from "sonner";
export const ProductManagement = () => {
  const { mutate, isPending } = useCreateProduct();
  const uploadRef = useRef<{ resetImages: () => void }>(null);
  const methods = useForm({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      highlightFeatured: false,
      isActive: true,
    },
    shouldUnregister: true,
    mode: "all",
  });
  const handleFormSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("shortDescription", data.shortDescription || "");
    if (data.productPrice != null) {
      formData.append("price", String(data.productPrice));
    }
    if (data.categoryId) {
      formData.append("categoryId", String(data.categoryId));
    }
    if (data.stockQuantity != null) {
      formData.append("stockQuantity", String(data.stockQuantity));
    }
    if (typeof data.isActive === "boolean") {
      formData.append("isActive", String(data.isActive ? "true" : "false"));
    }
    if (typeof data.highlightFeatured === "boolean") {
      formData.append("highlightFeatured", String(data.highlightFeatured));
    }

    const files: FileList | undefined = data.images;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => formData.append("images", file));
    }
    if (typeof data.primaryIndex === "number") {
      formData.append("primaryIndex", String(data.primaryIndex));
    }
    console.log("Submitting form with data:", formData);
    mutate(formData, {
      onSuccess: () => {
        methods.reset();
        uploadRef.current?.resetImages();
      },
      onError: (error) => {
        console.error("Product creation failed:", error);
      },
    });
  };
  return (
    <div className="px-2 sm:px-3 md:px-5 pt-3 md:pt-5 pb-6 md:pb-8 w-full max-w-full">
      <div className="pt-5 pb-2 sm:pb-4">
        <Header />
      </div>
      <FormProvider {...methods}>
        <form
          id="productForm"
          onSubmit={methods.handleSubmit(handleFormSubmit, (errors) => {
            console.error("[form:errors]", errors);
            toast.error("Please fix the highlighted validation errors.");
          })}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3 md:gap-5 w-full">
            <BasicDetails />
            <UploadProductDetails ref={uploadRef} />
          </div>
          <div className="flex flex-col sm:flex-row justify-start sm:justify-end items-stretch sm:items-center gap-3 md:gap-4 mt-3 md:mt-4">
            <Button
              variant="default"
              className="h-12 w-full sm:w-auto"
              type="submit"
            >
              {isPending ? "Publishing..." : "Publish Product"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

import { BasicDetails } from "@/components/ProductManagement/BasicDetails";
import { Header } from "@/components/ProductManagement/Header";
import { UploadProductDetails } from "@/components/ProductManagement/UploadProductDetails";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormSchema,
  type ProductFormType,
} from "@/components/ProductManagement/schema/ProductForm.zod";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useRef, useEffect } from "react";
export const ProductManagement = () => {
  const { mutate, isSuccess } = useCreateProduct();
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
  const handleFormSubmit = (data: ProductFormType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("shortDescription", data.shortDescription || "");
    if (data.categoryId) {
      formData.append("categoryId", String(data.categoryId));
    }
    if (typeof data.isActive === "boolean") {
      formData.append("isActive", String(data.isActive ? "true" : "false"));
    }
    if (typeof data.highlightFeatured === "boolean") {
      formData.append("highlightFeatured", String(data.highlightFeatured));
    }

    const files: File[] = data.images ?? [];
    if (files.length > 0) {
      files.forEach((file) => formData.append("images", file));
    }
    if (typeof data.primaryIndex === "number") {
      formData.append("primaryIndex", String(data.primaryIndex));
    }

    if (data.attributes && data.attributes.length > 0) {
      data.attributes.forEach((attr) => {
        formData.append("RequiredAttributeNames", attr);
      });
    }

    mutate(formData, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      uploadRef.current?.resetImages();
    }
  }, [isSuccess]);

  return (
    <div className="p-5 space-y-5 w-full max-w-full">
      <Header />
      <FormProvider {...methods}>
        <form
          id="productForm"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3 md:gap-5 w-full">
            <BasicDetails />
            <UploadProductDetails ref={uploadRef} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

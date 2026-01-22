"use client";

import { BasicDetails } from "@/components/ProductManagement/BasicDetails";
import { UploadProductDetails } from "@/components/ProductManagement/UploadProductDetails";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormSchema,
  type ProductFormType,
} from "@/components/ProductManagement/schema/ProductForm.zod";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useRef, useEffect, type Dispatch, type SetStateAction } from "react";

export const ProductManagement = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
        setOpen(false);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      uploadRef.current?.resetImages();
    }
  }, [isSuccess]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <FormProvider {...methods}>
        <form
          id="productForm"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="w-full"
        >
          <div className="flex flex-col gap-6 w-full">
            <div className="sticky top-0 text-[24px] font-bold text-[#23272E] text-center bg-white pb-2 z-9999">
              Add Product
            </div>
            <BasicDetails />
            <UploadProductDetails ref={uploadRef} />
          </div>
          <div className="sticky bottom-0 bg-white pt-4 flex justify-center z-9999">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
            >
              Save Product
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

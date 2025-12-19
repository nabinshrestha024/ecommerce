import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormValues,
} from "../Category/ProductZodVAlidation.tsx";
import { Input } from "../Input/Input.tsx";

type ProductData = {
  productId: string;
  name: string;
  createdAt: string;
  order: number;
  image: string;
  status: string;
  category?: string;
};

type Props = {
  product: ProductData;
  onSave: (product: ProductData) => void;
};

export const ProductForm = ({ product, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
    },
    mode: "onChange",
  });
  const onSubmit = (data: ProductFormValues) => {
    console.log("Form Data:", data);
    const updatedProduct: ProductData = {
      ...product,
      ...data,
    };
    onSave(updatedProduct);
    reset(updatedProduct);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Product
        </h2>

        <div className="grid grid-cols-4 gap-4 items-center ">
          <label className="col-span-1 font-medium text-gray-700">
            Product ID
          </label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={product.productId}
              placeholder=""
              {...register("productId")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.productId && (
              <p className="text-[12px] text-red-500 ">
                {errors.productId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Category ID</label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={product.category}
              placeholder=""
              {...register("categoryId")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.categoryId && (
              <p className="text-[12px] text-red-500 ">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Product Name</label>
          <div className="col-span-3">
            <Input
              type="text"
              defaultValue={product.name}
              placeholder=""
              {...register("name")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 ">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Brand</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("brand")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.brand && (
              <p className="text-[12px] text-red-500 ">
                {errors.brand.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <label className="font-medium text-gray-700 mt-2">Description</label>
          <div className="col-span-3">
            <Input
              type="textarea"
              placeholder=""
              {...register("description")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded resize-none focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.description && (
              <p className="text-[12px] text-red-500 ">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Price</label>
          <div className="col-span-3">
            <Input
              type="phone"
              placeholder=""
              {...register("price", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.price && (
              <p className="text-[12px] text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Is Active</label>
          <div className="col-span-3 flex items-center gap-2">
            <Input type="checkbox" placeholder="" {...register("isActive")} />
            <span className="text-sm text-gray-600">Product is active</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Created At</label>
          <div className="col-span-3">
            <Input
              type="date"
              defaultValue={product.createdAt}
              placeholder=""
              {...register("createdAt")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.createdAt && (
              <p className="text-[12px] text-red-500 ">
                {errors.createdAt.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center mt-5">
          <label className="font-medium text-gray-700">Updated At</label>
          <div className="col-span-3">
            <Input
              type="date"
              placeholder=""
              {...register("updatedAt")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

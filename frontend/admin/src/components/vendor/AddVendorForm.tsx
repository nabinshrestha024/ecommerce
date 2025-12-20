import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
interface VendorFormValues {
  productImage: FileList | null;
  vendorName: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
}
const AddVendorFormSchema = z.object({
  productImage: z.instanceof(FileList).nullable(),
  vendorName: z.string().min(1, "Vendor name is required"),
  contactEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
});

export const AddVendorForm = () => {
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorFormValues>({
    resolver: zodResolver(AddVendorFormSchema),
    defaultValues: {
      vendorName: "",
      contactEmail: "",
      phoneNumber: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<VendorFormValues> = (data) => {
    console.log("Form Data:", data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
  };
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="productImage" className="block cursor-pointer">
            <div className="relative border border-gray-300 rounded-md p-2 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Product preview"
                  className="max-h-40 object-cover"
                />
              ) : (
                <span className=" text-sm">Upload Logo</span>
              )}
            </div>
          </label>
          <input
            id="productImage"
            type="file"
            accept="image/*"
            {...register("productImage", { onChange: handleFileChange })}
            className="hidden"
          />
          {errors.productImage && (
            <p className="text-sm text-red-500 mt-1">
              {errors.productImage.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Vendor Name</label>
          <input
            type="text"
            placeholder="Enter vendor name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("vendorName", { required: "Vendor name is required" })}
          />
          {errors.vendorName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.vendorName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Contact Email</label>
          <input
            type="email"
            placeholder="Enter contact email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("contactEmail", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Address</label>
          <input
            type="text"
            placeholder="Enter address"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Vendor
          </button>
        </div>
      </div>
    </form>
  );
};

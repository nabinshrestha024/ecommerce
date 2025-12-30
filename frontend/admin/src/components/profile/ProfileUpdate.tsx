import { useEffect, useState, useRef } from "react";
import { Card } from "../Card/Card";
import { SquarePen } from "lucide-react";
import { Input } from "../Input/Input";
import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "../profile/schemas/Profile.zod";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { usePutProfile } from "@/hooks/profile/usePutProfile";

export const ProfileUpdate = () => {
  const { data } = useGetProfile();
  const { mutate } = usePutProfile();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(ProfileUpdateSchema), mode: "all" });

  const [preview, setPreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const formatDateOfBirth = (dateStr: string) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}T/.test(dateStr)) {
      return dateStr.slice(0, 10);
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    const m1 = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m1) {
      return `${m1[3]}-${m1[2]}-${m1[1]}`;
    }

    const m2 = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (m2) {
      return `${m2[3]}-${m2[2]}-${m2[1]}`;
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }

    return "";
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (!data) return;

    reset({
      fullName: data.fullName ?? "",
      email: data.email ?? "",
      phoneNumber: data.phone ?? "",
      address: data.address ?? "",
      dateOfBirth: formatDateOfBirth(data.dateOfBirth ?? ""),
      biography: data.bio ?? "",
    });

    if (data.profileImageUrl) {
      setPreview(
        data.profileImageUrl
          ? `http://192.168.80.229/${data.profileImageUrl}`
          : "",
      );
    } else {
      setPreview("");
    }
  }, [data, reset]);

  const handleImageInput = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
  };

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = (formData: any) => {
    const dataToSend = new FormData();

    const dob = formData.dateOfBirth
      ? new Date(formData.dateOfBirth)
      : new Date("2000-01-01");

    const day = String(dob.getDate()).padStart(2, "0");
    const month = String(dob.getMonth() + 1).padStart(2, "0");
    const year = dob.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    dataToSend.append("FullName", formData.fullName || "Unknown");
    dataToSend.append("Gender", formData.gender || "Male");
    dataToSend.append("Bio", formData.biography || "N/A");
    dataToSend.append("City", formData.city || "Unknown");
    dataToSend.append("Phone", formData.phoneNumber || "0000000000");
    dataToSend.append("Status", formData.status ?? "0");
    dataToSend.append("Address", formData.address || "N/A");
    dataToSend.append("RemoveProfileImage", "false");
    dataToSend.append("DateOfBirth", formattedDate);

    if (selectedImage) {
      dataToSend.append("ProfileImageFile", selectedImage);
    }

    mutate(dataToSend);
  };

  return (
    <Card
      className="p-0 shadow-sm px-4 sm:px-6 rounded-md pb-6 sm:pb-10 border"
      cardClassName="p-0 border-none shadow-none rounded-xl"
    >
      <div className="pt-4">
        <div className="flex flex-row justify-between items-center mb-4 sm:mb-6">
          <div className="font-bold text-lg sm:text-[22px] leading-tight sm:leading-[26px] tracking-[0%]">
            Profile Update
          </div>
          <button
            className="rounded-lg border border-gray-200 p-2 sm:p-2.5 hover:bg-gray-50 transition-colors duration-200"
            onClick={handleEditToggle}
            aria-label={isEditing ? "Cancel editing" : "Edit profile"}
          >
            <SquarePen className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <form
          className="space-y-4 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="relative">
              <img
                src={preview || "profile.webp"}
                alt="Profile"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={imageInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              disabled={!isEditing}
              onClick={handleImageInput}
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                !isEditing
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Upload New Picture
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                disabled={!isEditing}
                {...register("fullName")}
                className={`w-full mt-2 ${!isEditing ? "cursor-not-allowed" : ""}`}
              />
              {errors.fullName && (
                <div className="text-red-600 text-sm">
                  {errors.fullName.message}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col ">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                disabled={!isEditing}
                {...register("phoneNumber")}
                className={`w-full mt-2 ${!isEditing ? "cursor-not-allowed" : ""}`}
              />
              {errors.phoneNumber && (
                <div className="text-red-600 text-sm">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col ">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                disabled={!isEditing}
                {...register("email")}
                className={`w-full mt-2 ${!isEditing ? "cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <div className="text-red-600 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex flex-col ">
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                disabled={!isEditing}
                {...register("dateOfBirth")}
                className={`w-full mt-2 ${!isEditing ? "cursor-not-allowed" : ""}`}
              />
              {errors.dateOfBirth && (
                <div className="text-red-600 text-sm">
                  {errors.dateOfBirth.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="text-sm font-medium">Location</label>
            <Input
              type="text"
              disabled={!isEditing}
              {...register("address")}
              className={`w-full mt-2 ${!isEditing ? "cursor-not-allowed" : ""}`}
            />
            {errors.address && (
              <div className="text-red-600 text-sm">
                {errors.address.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Biography</label>
            <Input
              type="textarea"
              disabled={!isEditing}
              {...register("biography")}
              className={`w-full border rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${
                !isEditing ? "cursor-not-allowed" : ""
              }`}
            />
            {errors.biography && (
              <div className="text-red-600 text-sm">
                {errors.biography.message}
              </div>
            )}
          </div>

          {isEditing && (
            <Button
              className="h-11 w-full font-medium"
              variant="default"
              type="submit"
            >
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
};

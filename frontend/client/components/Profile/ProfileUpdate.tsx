"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "../Card/Card";
import { SquarePen } from "lucide-react";
import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "./schemas/Profile.zod";
import { Input } from "@/ui/input";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import Image from "next/image";

export interface ProfileFormData {
  profilePicture?: File;
  fullName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  biography?: string;
  dateOfBirth?: string;
  gender?: string;
  status?: string;
  city?: string;
}

export const ProfileUpdate = () => {
  const { data } = useFetchProfile();
  // const { mutate } = usePutProfile();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileUpdateSchema),
    mode: "all",
  });

  const [preview, setPreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      dateOfBirth: data.dateOfBirth ?? "",
      biography: data.bio ?? "",
    });
  }, [data, reset]);
  const defaultImage = data.profileImageUrl;

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
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = (formData: ProfileFormData) => {
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
      dataToSend.append("ProfileImageUrl", selectedImage, selectedImage.name);
    }

    // mutate(dataToSend);
  };

  return (
    <Card
      className="p-0 shadow-sm px-4 sm:px-6 rounded-md pb-6 sm:pb-10 border"
      rootClassName="p-0 border-none shadow-none rounded-xl"
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
              <Image
                src={preview || defaultImage || "/default.jpg"}
                alt="Profile"
                width={20}
                height={20}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profilePicture")}
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                disabled={!isEditing}
                {...register("fullName")}
                className={`w-full ${!isEditing ? "cursor-not-allowed" : ""}`}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                type="tel"
                disabled={!isEditing}
                {...register("phoneNumber")}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                disabled={!isEditing}
                {...register("email")}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                disabled={!isEditing}
                {...register("dateOfBirth")}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
              {errors.dateOfBirth && (
                <p className="text-red-600 text-sm">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              type="text"
              disabled={!isEditing}
              {...register("address")}
              className={!isEditing ? "cursor-not-allowed" : ""}
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Biography</label>
            <textarea
              disabled={!isEditing}
              {...register("biography")}
              className={`w-full border rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${
                !isEditing ? "cursor-not-allowed" : ""
              }`}
            />
            {errors.biography && (
              <p className="text-red-600 text-sm">{errors.biography.message}</p>
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

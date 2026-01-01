"use client";
import { useEffect, useState, useRef } from "react";
import { Card } from "../Card/Card";
import {
  SquarePen,
  User,
  MapPin,
  Mail,
  MessageSquare,
  Calendar,
  Phone,
} from "lucide-react";
import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "./schemas/Profile.zod";
import { Input } from "@/ui/input";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { usePutProfile } from "@/hooks/profile/usePutProfile";
import type { ProfileResponse } from "@/services/profile.services";

export const ProfileUpdate = () => {
  const { data } = useGetProfile();
  const { mutate } = usePutProfile();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      address: data.address ?? "",
      bio: data.bio ?? "",
      city: data.city ?? "",
    });
  }, [data, reset]);

  const defaultImage = data?.profileImageUrl;

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

  const onSubmit = (formData: ProfileResponse) => {
    const dataToSend = new FormData();
    dataToSend.append("FullName", formData.fullName || "Unknown");
    dataToSend.append("Bio", formData.bio || "N/A");
    dataToSend.append("City", formData.city || "Unknown");
    dataToSend.append("Address", formData.address || "N/A");
    if (selectedImage) {
      dataToSend.append("ProfileImageFile", selectedImage, selectedImage.name);
    }
    console.log(dataToSend);
    mutate(dataToSend as ProfileResponse);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Card
      className="p-0 shadow-lg border-0 bg-white"
      cardClassName="p-0 border-none shadow-none rounded-2xl overflow-hidden"
    >
      <div className="bg-[#4EA674] px-6 py-8 sm:px-8">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-1">
              Profile Settings
            </h2>
            <p className="text-blue-100 text-sm">
              Manage your personal information
            </p>
          </div>
          <button
            className={`rounded-xl p-3 transition-all duration-200 ${
              isEditing
                ? "bg-white text-[#4EA674] shadow-md hover:shadow-lg"
                : " text-white"
            }`}
            onClick={handleEditToggle}
            aria-label={isEditing ? "Cancel editing" : "Edit profile"}
          >
            <SquarePen className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-6 py-8 sm:px-8">
        <div className="space-y-8">
          <div className="flex flex-col items-center gap-6 pb-8 border-b border-gray-100">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative">
                <img
                  src={preview || defaultImage || "/default.jpg"}
                  alt="Profile"
                  className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white shadow-xl relative"
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("profileImageFile")}
              ref={imageInputRef}
              onChange={handleImageChange}
            />
            <Button
              type="button"
              disabled={!isEditing}
              onClick={handleImageInput}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                !isEditing
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : " text-white hover:shadow-lg hover:scale-105 active:scale-95"
              }`}
            >
              Upload New Picture
            </Button>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-[#4EA674]" />
              Personal Information
            </h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  Full Name
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("fullName")}
                  className={`h-12 border-gray-200 focus:border-[#4EA674] focus:ring-[#4EA674] rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#4EA674]" />
              Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  Phone Number
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center">
                  {data?.phone || "Not provided"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  Gender
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center">
                  {data?.gender || "Not specified"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Email
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center truncate">
                  {data?.email || "Not provided"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  Date of Birth
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center">
                  {data?.dateOfBirth?.split("T")[0] || "Not provided"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#4EA674]" />
              Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  Address
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("address")}
                  className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  City
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("city")}
                  className={`h-12 border-gray-200 focus:border-[#4EA674] focus:ring-[#4EA674]rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#4EA674]" />
              About
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Biography
              </label>
              <textarea
                disabled={!isEditing}
                {...register("bio")}
                placeholder="Tell us about yourself..."
                className={`w-full border border-gray-200 rounded-xl p-4 h-36 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  !isEditing
                    ? "bg-gray-50 cursor-not-allowed text-gray-400"
                    : "bg-white"
                }`}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="pt-4">
              <Button
                className="h-12 w-full font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                variant="default"
                type="button"
                onClick={handleFormSubmit}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

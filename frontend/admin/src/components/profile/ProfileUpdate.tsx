"use client";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "./schemas/Profile.zod";
import { Input } from "@/ui/input";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { usePutProfile } from "@/hooks/profile/usePutProfile";
import type { ProfileResponse } from "@/services/profile.services";
import { ChangePassword } from "./ChangePassword";
import { SocialLinks } from "./SocialLink";
import { Spinner } from "../Spinner/Spinner";
import { MdEdit } from "react-icons/md";

export interface ProfileField {
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  bio?: string;
  profileImageFile?: File;
}

export const ProfileUpdate = () => {
  const { data, isLoading } = useGetProfile();
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

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    if (!data) return;
    const firstName = data.fullName.split(" ")[0];
    const lastName = data.fullName.trim().split(/\s+/).slice(1).join(" ");
    reset({
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      address: data.address ?? "",
      bio: data.bio ?? "",
      city: data.city ?? "",
    });
  }, [data, reset]);

  const onSubmit = (formData: ProfileField) => {
    const dataToSend = new FormData();
    const fullName = [formData.firstName, formData.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    dataToSend.append("FullName", fullName || "Unknown");
    dataToSend.append("Bio", formData.bio || "N/A");
    dataToSend.append("City", formData.city || "Unknown");
    dataToSend.append("Address", formData.address || "N/A");
    mutate(dataToSend as ProfileResponse);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="space-y-5">
      <Card
        className="p-5 shadow-lg border-0 justify-between items-start relative border-b-2 border-b-gray-100 "
        cardClassName="p-0 border-none shadow-none rounded-none overflow-hidden"
      >
        <div className="space-y-5 ">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 ">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  First Name
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("firstName")}
                  className={`h-12 border-gray-200 focus:border-[#4EA674] focus:ring-[#4EA674] rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-md flex items-center gap-1 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  Last Name
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("lastName")}
                  className={`h-12 border-gray-200 focus:border-[#4EA674] focus:ring-[#4EA674] rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-md flex items-center gap-1 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  Gender
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center">
                  {data?.gender || "Not specified"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  Date of Birth
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center">
                  {data?.dateOfBirth?.split("T")[0] || "Not provided"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                Biography
              </label>
              <textarea
                disabled={!isEditing}
                {...register("bio")}
                placeholder="Tell us about yourself..."
                className={`w-full border border-gray-200 rounded-xl p-4 h-36 resize-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all duration-200 ${
                  !isEditing
                    ? "bg-gray-50 cursor-not-allowed text-gray-400"
                    : "bg-white"
                }`}
              />
              {errors.bio && (
                <p className="text-red-500 text-md">{errors.bio.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  Phone Number
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center">
                  {data?.phone || "Not provided"}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  Email
                </label>
                <div className="h-12 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 flex items-center truncate">
                  {data?.email || "Not provided"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  Address
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("address")}
                  className={`h-12 border-gray-200 focus:border-green-600 focus:ring-green-600 rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-md">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-md font-medium text-gray-700 flex items-center gap-2">
                  City
                </label>
                <Input
                  type="text"
                  disabled={!isEditing}
                  {...register("city")}
                  className={`h-12 border-gray-200 focus:border-green-600 focus:ring-green-600 rounded-xl transition-all ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-md">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="pt-4">
              <Button
                className="mt-3 sm:mt-4 h-10 w-full text-sm"
                variant={"default"}
                type="submit"
                onClick={handleFormSubmit}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <button
          className={`transition-all duration-200 absolute top-2 right-3 ${
            isEditing ? "bg-white text-[#4EA674] " : " text-white"
          }`}
          onClick={handleEditToggle}
          aria-label={isEditing ? "Cancel editing" : "Edit profile"}
        >
          <MdEdit size={20} className="text-gray-500" />
        </button>
      </Card>
      <ChangePassword />
      <SocialLinks />
    </div>
  );
};

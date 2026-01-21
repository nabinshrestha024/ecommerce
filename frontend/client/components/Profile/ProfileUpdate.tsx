"use client";
import { useEffect, useState } from "react";
import { Card } from "../card/Card";
import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdateSchema } from "./schemas/Profile.zod";
import { Input } from "@/ui/input";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import { useEditProfile } from "@/hooks/profile/useEditProfile";
import { ChangePassword } from "./ChangePassword";
import { SocialLinks } from "./SocialLinks";
import { MdEdit } from "react-icons/md";

export interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  bio?: string;
  profileImageFile?: File;
}

export const ProfileUpdate = () => {
  const { data } = useFetchProfile();
  const { mutate } = useEditProfile();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
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

  const onSubmit = (formData: ProfileFormData) => {
    const dataToSend = new FormData();
    const fullName = [formData.firstName, formData.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    dataToSend.append("FullName", fullName || "Unknown");
    dataToSend.append("Bio", formData.bio || "N/A");
    dataToSend.append("City", formData.city || "Unknown");
    dataToSend.append("Address", formData.address || "N/A");
    mutate(dataToSend as ProfileFormData);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Card
      className="p-0 shadow-lg border-0 bg-white"
      rootClassName="p-0 border-none shadow-none rounded-2xl overflow-hidden"
    >
      <div className="bg-[#4EA674] p-5 ">
        <div>
          <h2 className="font-bold text-2xl sm:text-3xl text-white mb-1">
            Profile Settings
          </h2>
          <p className="text-blue-100 text-sm">
            Manage your personal information
          </p>
        </div>
      </div>

      <div>
        <Card
          className="p-5 shadow-lg border-0 justify-between items-start relative border-b-2 border-b-gray-100 "
          rootClassName="p-0 border-none shadow-none rounded-none overflow-hidden"
        >
          <div className="space-y-5 ">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                Personal Information
              </h3>
              <button
                className={` transition-all duration-200 ${
                  isEditing ? "bg-white text-[#4EA674]" : " text-white"
                }`}
                onClick={handleEditToggle}
                aria-label={isEditing ? "Cancel editing" : "Edit profile"}
              >
                <MdEdit className="h-5 w-5 text-gray-500" />
              </button>
            </div>

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

            <div className="space-y-5">
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

            <div className="space-y-5">
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
                    <p className="text-red-500 text-md">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <Button
                className="h-10 w-full text-sm"
                variant={"default"}
                type="submit"
                onClick={handleFormSubmit}
              >
                Save Changes
              </Button>
            )}
          </div>
        </Card>
        <ChangePassword />
        <SocialLinks />
      </div>
    </Card>
  );
};

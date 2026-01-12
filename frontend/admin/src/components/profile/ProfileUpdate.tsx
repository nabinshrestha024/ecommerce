"use client";
import { useEffect, useState } from "react";
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

  const [isEditing, setIsEditing] = useState(false);

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

  const onSubmit = (formData: ProfileResponse) => {
    const dataToSend = new FormData();
    dataToSend.append("FullName", formData.fullName || "Unknown");
    dataToSend.append("Bio", formData.bio || "N/A");
    dataToSend.append("City", formData.city || "Unknown");
    dataToSend.append("Address", formData.address || "N/A");
    mutate(dataToSend as ProfileResponse);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Card
      className="px-5 shadow-lg border-0 justify-between items-start relative"
      cardClassName="p-0 border-none shadow-none rounded-2xl overflow-hidden"
    >
      <div className="">
        <div className="space-y-8">
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

      <button
        className={`rounded-xl p-3 transition-all duration-200 absolute top-2 right-3 ${
          isEditing
            ? "bg-white text-[#4EA674] shadow-md hover:shadow-lg"
            : " text-white"
        }`}
        onClick={handleEditToggle}
        aria-label={isEditing ? "Cancel editing" : "Edit profile"}
      >
        <SquarePen className="h-5 w-5" color="black" />
      </button>
    </Card>
  );
};

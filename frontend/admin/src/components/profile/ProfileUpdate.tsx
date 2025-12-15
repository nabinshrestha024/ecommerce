import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { SquarePen } from "lucide-react";
import { Input } from "../Input/Input";
import { Button } from "@/ui/button";
import { useRef } from "react";

export const ProfileUpdate = () => {
  const [preview, setPreview] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        <form className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="relative">
              <img
                src={preview || "https://via.placeholder.com/64"}
                alt="Profile"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={imageInputRef}
            />
            <button
              type="button"
              disabled={!isEditing}
              onClick={handleImageInput}
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                !isEditing
                  ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Upload New Picture
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                type="text"
                placeholder="Wade"
                disabled={!isEditing}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Warren"
                disabled={!isEditing}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="********"
                disabled={!isEditing}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="1234567890"
                disabled={!isEditing}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="wade@example.com"
                disabled={!isEditing}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <Input
                type="date"
                placeholder="01/01/2003"
                disabled={!isEditing}
                className={!isEditing ? "cursor-not-allowed" : ""}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <Input
              type="text"
              placeholder="1234 Main St, City, Country"
              disabled={!isEditing}
              className={!isEditing ? "cursor-not-allowed" : ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Biography
            </label>
            <textarea
              placeholder="Tell us about yourself"
              disabled={!isEditing}
              className={`w-full bg-gray-50 border border-gray-300 rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base ${
                !isEditing
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-900"
              }`}
            />
          </div>

          {isEditing && (
            <Button className="h-11 w-full font-medium" variant="default">
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
};

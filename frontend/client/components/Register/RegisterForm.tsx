"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormSchema, RegisterFormSchemaType } from "./registerForm.zod";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export const RegisterForm = ({}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: RegisterFormSchemaType) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="py-6 flex flex-col gap-2"
    >
      <div className="text-3xl font-semibold mb-5">Register</div>
      <div className="">
        <div className="flex flex-col gap-6 px-2 max-h-[300px] overflow-scroll overflow-x-hidden">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your name"
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="m@example.com"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
              placeholder="Enter your phone number"
              className="no-spinner"
            />
            <p className="text-red-500">{errors.phoneNumber?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rePassword">Re-Password</Label>
            <Input
              id="rePassword"
              {...register("repassword")}
              type="password"
              placeholder="Enter your password again"
            />
            <p className="text-red-500">{errors.repassword?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address")}
              type="text"
              placeholder="Enter your address"
            />
            <p className="text-red-500">{errors.address?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city")}
              type="text"
              placeholder="Enter your city"
            />
            <p className="text-red-500">{errors.city?.message}</p>
          </div>
          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <div className="grid gap-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>

                {previewUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-24 w-24 rounded-full overflow-hidden border">
                      <Image
                        src={previewUrl}
                        alt="Profile Preview"
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => imageRef.current?.click()}
                    >
                      Choose Another
                    </Button>
                  </div>
                ) : null}

                <Input
                  type="file"
                  accept="image/*"
                  ref={(e) => {
                    field.ref(e);
                    imageRef.current = e;
                  }}
                  style={{ display: previewUrl ? "none" : "block" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
                <p className="text-red-500 text-sm">
                  {errors.profilePicture?.message}
                </p>
              </div>
            )}
          />
        </div>
        <div>
          <Button type="submit" className="mt-5 w-full" value={"Register"}>
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

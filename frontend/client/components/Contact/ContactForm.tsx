"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { ContactFormSchema, ContactFormSchemaType } from "./contactForm.zod";

export const ContactForm = ({}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: ContactFormSchemaType) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="text-3xl font-bold mb-5 text-green-600">Contact Form</div>
      <div>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter your full name"
            />
            <p className="text-red-500">{errors.fullName?.message}</p>
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
            <Label htmlFor="phone">Phone number</Label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
              placeholder="Enter your phone number"
              className="no-spinner"
            />
            <p className="text-red-500">{errors.phone?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              {...register("country")}
              type="text"
              placeholder="Enter your country"
            />
            <p className="text-red-500">{errors.country?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">
              Please enter reason for your inquiry
            </Label>
            <Input
              id="details"
              {...register("details")}
              type="textarea"
              placeholder="Enter your reason for inquiry"
            />
            <p className="text-red-500">{errors.details?.message}</p>
          </div>
        </div>
        <div>
          <Button type="submit" className="mt-5">
            Contact Sales
          </Button>
        </div>
      </div>
    </form>
  );
};

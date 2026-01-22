import type React from "react";
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center  mt-5">
      <div className="font-medium text-gray-700">{title}</div>
      {children}
    </div>
  );
};

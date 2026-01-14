import type React from "react";
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
};

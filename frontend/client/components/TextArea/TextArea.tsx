import { Textarea as Root } from "@/ui/textarea";
interface TextAreaProps {
  placeholder?: string;
  className?: string;
  maxLength?: number;
}

export const TextArea = ({
  placeholder,
  className,
  maxLength,
  ...props
}: TextAreaProps) => {
  return (
    <Root
      placeholder={placeholder}
      maxLength={maxLength}
      className={`${className}`}
      {...props}
    ></Root>
  );
};

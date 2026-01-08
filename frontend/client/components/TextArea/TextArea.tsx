import { Textarea as Root } from "@/ui/textarea";
interface TextAreaProps {
  placeholder?: string;
  className?: string;
}

export const TextArea = ({
  placeholder,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <Root
      placeholder={placeholder}
      className={`${className}`}
      {...props}
    ></Root>
  );
};

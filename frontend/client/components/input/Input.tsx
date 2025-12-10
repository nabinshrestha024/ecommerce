import { Input as Root } from "@/ui/input";

interface InputProps {
  type: string;
  placeholder: string;
  inputClassName?: string,
  error?: string | undefined;
}

export const Input = ({
  type,
  placeholder,
  inputClassName,
  error,
  ...props
}: InputProps) => {
  return (
    <div>
      <Root
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...props}          
      />
      {error && (
        <div className=" text-red-500">{error}</div>
      )}
    </div>
  )
}
    
import { Input as Root } from "@/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  error?: string | undefined;
}

export const Input = ({
  type,
  placeholder,
  inputClassName,
  error,
  disabled,
  ...props
}: InputProps) => {
  const [show, setShow] = useState(false);

  if (type === "password") {
    return (
      <div className="relative w-full">
        <Root
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`${inputClassName ?? ""} pr-10`}
          disabled={disabled}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          {!show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>

        {error && <div className="text-[14px] text-red-500 mt-3">{error}</div>}
      </div>
    );
  }

  return (
    <div>
      <Root
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        disabled={disabled}
        {...props}
      />
      {error && <div className=" text-red-500">{error}</div>}
    </div>
  );
};

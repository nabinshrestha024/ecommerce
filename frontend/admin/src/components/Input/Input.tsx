import { cn } from "@/lib/utils";

import { Input as Root } from "@/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
} from "react";

type CommonProps = {
  placeholder: string;
  className?: string;
  icon?: ReactNode;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
};

type TextAreaProps = CommonProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
  };

type InputProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type: string;
  };

type Props = InputProps | TextAreaProps;

export const Input = forwardRef<HTMLElement, Props>(
  (
    {
      type,
      placeholder,
      className,
      defaultValue,
      error,
      disabled,
      name,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputProps = props as InputHTMLAttributes<HTMLInputElement>;
    const textareaProps = props as TextareaHTMLAttributes<HTMLTextAreaElement>;

    const [password, setPassword] = useState(true);

    if (type === "date") {
      return (
        <div>
          <Root
            type="date"
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            defaultValue={defaultValue}
            ref={ref as Ref<HTMLInputElement>}
            {...inputProps}
          />
          {error && (
            <div className="text-[14px] text-red-500 mt-3">{error}</div>
          )}
        </div>
      );
    }

    if (type === "phone") {
      return (
        <div>
          <Root
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            maxLength={10}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            ref={ref as Ref<HTMLInputElement>}
            {...inputProps}
          />
          {error && (
            <div className="text-[14px] text-red-500 mt-3">{error}</div>
          )}
        </div>
      );
    }

    if (type === "password") {
      return (
        <div className={cn("relative w-full", className)}>
          <Root
            type={!password ? "text" : "password"}
            className="pr-10"
            disabled={disabled}
            name={name}
            ref={ref as Ref<HTMLInputElement>}
            {...inputProps}
            placeholder={placeholder}
          />

          <button
            type="button"
            onClick={() => setPassword((s) => !s)}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            {!password ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
          {error && (
            <div className="text-[14px] text-red-500 mt-3">{error}</div>
          )}
        </div>
      );
    }
    if (type === "textarea") {
      return (
        <div>
          <textarea
            className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${className}`}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            ref={ref as Ref<HTMLTextAreaElement>}
            {...textareaProps}
          ></textarea>
          {error && (
            <div className="text-[14px] text-red-500 mt-3">{error}</div>
          )}
        </div>
      );
    }

    return (
      <div>
        <Root
          type={type}
          className={className}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          ref={ref as Ref<HTMLInputElement>}
          {...inputProps}
        />
        {error && <div className="text-[14px] text-red-500 mt-3">{error}</div>}
      </div>
    );
  },
);

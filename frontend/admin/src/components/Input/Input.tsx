import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Input as Root } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import {
  forwardRef,
  useState,
  type ChangeEvent,
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

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(() =>
      defaultValue ? new Date(defaultValue) : undefined,
    );
    const [password, setPassword] = useState(true);

    if (type === "date") {
      const value = date ? date.toISOString().split("T")[0] : "";

      return (
        <div className={cn("w-full", className)}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                className="w-full justify-between font-normal"
                disabled={disabled}
              >
                {date ? date.toLocaleDateString() : placeholder}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                disabled={disabled}
                onSelect={(next) => {
                  setDate(next);
                  const nextValue = next
                    ? next.toISOString().split("T")[0]
                    : "";

                  onChange?.({
                    target: { value: nextValue, name },
                    currentTarget: { value: nextValue, name },
                  } as unknown as ChangeEvent<HTMLInputElement>);

                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          <input
            type="hidden"
            name={name}
            value={value}
            ref={ref as Ref<HTMLInputElement>}
            readOnly
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
            className={className}
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

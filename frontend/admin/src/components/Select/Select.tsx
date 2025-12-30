import {
  Select as Root,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import type { ReactNode } from "react";

interface SelectDataType {
  id: number;
  content: ReactNode;
  value: string;
}

interface SelectProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  itemClassName?: string;
  selectData: SelectDataType[];
}

export const Select = ({
  defaultValue,
  value,
  onValueChange,
  triggerClassName,
  itemClassName,
  selectData,
}: SelectProps) => {
  return (
    <Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-background text-foreground">
        <SelectGroup className="bg-background text-foreground">
          {selectData.map((val) => (
            <SelectItem
              key={val.id}
              value={val.value}
              className={`${itemClassName} bg-background text-foreground`}
            >
              {val.content}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Root>
  );
};

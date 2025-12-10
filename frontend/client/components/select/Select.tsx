import {
  Select as Root,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface SelectDataType {
  id: number;
  text: string;
}

interface SelectProps {
  defaultValue: string;
  triggerClassName?: string;
  itemClassName?: string;
  selectData: SelectDataType[];
}

export const Select = ({
  defaultValue,
  triggerClassName,
  itemClassName,
  selectData,
}: SelectProps) => {
  return (
    <Root defaultValue={defaultValue}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {selectData.map((val) => (
            <SelectItem key={val.id} value={val.text} className={itemClassName}>
              <div>{val.text}</div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Root>
  );
};
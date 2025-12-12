import { Input } from "../Input/Input";
import { Search } from "lucide-react";

interface SearchProps {
  placeholder: string;
  className?: string;
}

export const SearchProduct = ({ placeholder, className }: SearchProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        type="text"
        placeholder={placeholder}
        className={`${className} pr-10`}
      />
    </div>
  );
};

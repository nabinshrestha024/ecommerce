import { useState } from "react";
import { Star } from "lucide-react";
interface StarInputProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
}

export const StarInput = ({ value = 0, onChange, max = 5 }: StarInputProps) => {
  const [hoveredValue, setHoveredValue] = useState<number>(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <Star
          key={star}
          size={24}
          className={`
                        cursor-pointer transistion
                        ${star <= (hoveredValue || value) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
                    }`}
          onMouseEnter={() => setHoveredValue(star)}
          onMouseLeave={() => setHoveredValue(0)}
          onClick={() => onChange?.(star)}
        />
      ))}
    </div>
  );
};

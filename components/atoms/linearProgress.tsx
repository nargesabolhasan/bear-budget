import React from "react";
import { twMerge } from "tailwind-merge";

interface LinearProgressProps {
  value: number;
  height?: number;
  filledColor?: string;
  remainingColor?: string;
  label?: string;
  overFlow?: boolean;
}

const ILinearProgress: React.FC<LinearProgressProps> = ({
  value,
  height = 12,
  filledColor = "bg-primary",
  remainingColor = "bg-placeholder_light",
  label,
  overFlow = false,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  return (
    <div className="w-full">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}

      <div
        className={twMerge("w-full rounded-full", remainingColor)}
        style={{ height }}
      >
        <div
          className={twMerge(
            "h-full rounded-full transition-all duration-300",
            filledColor,
            value > 85 && "bg-danger_light2",
            overFlow && "bg-hover_danger"
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <div className={"flex flex-row justify-between"}>
        {overFlow && (
          <div className="mt-1 text-xs md:text-sm text-hover_danger">
            overflow !
          </div>
        )}
        <div className="mt-1 text-xs md:text-sm text-right grow">
          {clampedValue.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default ILinearProgress;

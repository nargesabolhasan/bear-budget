"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { IconOption } from "@/types/global";
import { PICKER_WRAPPER_CLASS } from "@/constant/className";
import { twMerge } from "tailwind-merge";

interface IconPickerProps {
  icons: IconOption[];
  onChange: (iconId: string | null) => void;
  value: string | null;
  className?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({
  onChange,
  icons,
  value,
  className,
}) => {
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const button = (e.target as HTMLElement).closest(".icon-picker-item");
    if (button) {
      const buttonId = button.getAttribute("data-icon-id");

      onChange(buttonId);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={twMerge(
        "icon-wrapper",
        PICKER_WRAPPER_CLASS,
        className && className
      )}
    >
      {icons.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={twMerge(
              "icon-picker-item border bg-neutral border-placeholder_light p-2 rounded-lg hover:bg-placeholder_light",
              value === item.id && "border-dark! bg-placeholder_light"
            )}
            data-icon-id={item.id}
            color={value === item.id ? "primary" : "default"}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

export default IconPicker;

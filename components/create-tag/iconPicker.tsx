"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { IconOption } from "@/types/global";
import { PICKER_WRAPPER_CLASS } from "@/constant/className";
import twMerge from "@/utils/utils";

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
          <IconButton
            key={item.id}
            className={"icon-picker-item"}
            data-icon-id={item.id}
            color={value === item.id ? "primary" : "default"}
            sx={{
              border: value === item.id ? "2px solid" : "1px solid lightgray",
              borderRadius: 2,
              flexDirection: "column",
            }}
          >
            <Icon />
          </IconButton>
        );
      })}
    </div>
  );
};

export default IconPicker;

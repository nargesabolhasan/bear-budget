"use client";

import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { IconOption } from "@/types/global";

interface IconPickerProps {
  icons: Array<IconOption[string]>;
  onSelect: (iconId: string | null) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ onSelect, icons }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = (e.target as HTMLElement).closest(".icon-picker-item");
    if (button) {
      const buttonId = button.getAttribute("data-icon-id");
      setSelectedId(buttonId);
      onSelect(buttonId);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={
        "bg-gray-100 border border-gray-200 rounded-md shadow-sm p-3 flex items-center justify-center gap-3"
      }
    >
      {icons.map((item: IconOption[string]) => {
        const Icon = item.icon;
        return (
          <IconButton
            className={"icon-picker-item focus:bg-blue-500"}
            data-icon-id={item.id}
            color={selectedId === item.id ? "primary" : "default"}
            sx={{
              border:
                selectedId === item.id ? "2px solid" : "1px solid lightgray",
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

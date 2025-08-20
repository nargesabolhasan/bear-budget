"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { TagType } from "@/types/global";
import { PICKER_WRAPPER_CLASS } from "@/constant";
import TagDemo from "@/components/create-tag/tagDemo";

interface TagPickerProps {
  items: TagType[];
  onChange: (iconId: TagType["id"] | null) => void;
  value: string | null;
}

const TagPicker = ({ onChange, items, value }: TagPickerProps) => {
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = (e.target as HTMLElement).closest(".icon-picker-item");
    if (button) {
      const buttonId = button.getAttribute("data-tag-id");

      onChange(buttonId);
    }
  };

  return (
    <div onClick={handleSelect} className={PICKER_WRAPPER_CLASS}>
      {items.map((item) => {
        return (
          <IconButton
            key={item.id}
            className={"icon-picker-item focus:bg-blue-500"}
            data-tag-id={item.id}
            color={value === item.id ? "primary" : "default"}
            sx={{
              border: value === item.id ? "2px solid" : "1px solid lightgray",
              borderRadius: 2,
              flexDirection: "column",
            }}
          >
            <TagDemo
              icon={item.icon}
              name={item.name}
              color={item.color}
              transactionType={item.transactionType}
            />
          </IconButton>
        );
      })}
    </div>
  );
};

export default TagPicker;

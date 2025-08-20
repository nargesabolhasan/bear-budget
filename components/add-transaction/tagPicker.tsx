"use client";

import React from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { TagType } from "@/types/global";
import TagDemo from "@/components/create-tag/tagDemo";

interface TagPickerProps {
  items: TagType[];
  onChange: (iconId: TagType["id"] | null) => void;
  value: string | null;
}

const TagPicker = ({ onChange, items, value }: TagPickerProps) => {
  const handleSelect = (e: SelectChangeEvent<string>) => {
    onChange(e.target.value || null);
  };

  return (
    <Select onChange={handleSelect} value={value ?? ""} displayEmpty fullWidth>
      {items.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          <TagDemo
            icon={item.icon}
            name={item.name}
            color={item.color}
            transactionType={item.transactionType}
          />
        </MenuItem>
      ))}
    </Select>
  );
};

export default TagPicker;

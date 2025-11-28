"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { TagInfoTransaction, TagType } from "@/types/global";
import TagDemo from "@/components/create-tag/tagDemo";

export type tagPickerType = {
  tagList: TagType[];
  onChange: ({ id, name, type, icon, color }: TagInfoTransaction) => void;
  value: { id: string; name: string };
  className?: string;
};

const TagPicker = ({
  tagList,
  value = { id: "", name: "" },
  onChange,
  className,
}: tagPickerType) => {
  const handleSelect = (tag: TagType) => {
    onChange({
      id: tag.id,
      name: tag.name,
      type: tag.transactionType,
      icon: tag.icon,
      color: tag.color.color,
    });
  };

  return (
    <div
      className={twMerge(
        "tag-wrapper w-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3",
        className
      )}
    >
      {tagList.map((tag) => (
        <TagDemo
          key={tag.id}
          className={twMerge(
            "tag-picker-item w-[100px] p-2! hover:bg-placeholder_light2",
            value.id === tag.id &&
              "bg-placeholder_light border-solid border-2 !border-dark scale-105 shadow-md"
          )}
          icon={tag.icon}
          name={tag.name}
          color={tag.color}
          transactionType={tag.transactionType}
          onClick={() => handleSelect(tag)}
        />
      ))}
    </div>
  );
};

export default TagPicker;

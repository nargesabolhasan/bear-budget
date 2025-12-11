"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { TagType } from "@/types/global";
import TagDemo from "@/components/create-tag/tagDemo";

export type tagPickerType = {
  tagList: TagType[];
  onChange: (id: string) => void;
  value: string;
  className?: string;
};

const TagPicker = ({
  tagList,
  value = "",
  onChange,
  className,
}: tagPickerType) => {
  const handleSelect = (tag: string) => {
    onChange(tag);
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
            "tag-picker-item w-[100px] p-2! hover:bg-neutral_light",
            value === tag.id &&
              "bg-neutral_light border-solid border-3 !border-primary scale-105 shadow-md"
          )}
          icon={tag.icon}
          name={tag.name}
          color={tag.color}
          transactionType={tag.transactionType}
          onClick={() => handleSelect(tag.id)}
        />
      ))}
    </div>
  );
};

export default TagPicker;

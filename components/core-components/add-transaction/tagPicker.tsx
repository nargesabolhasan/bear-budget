"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { TagType } from "@/types/global";
import TagDemo from "@/components/core-components/create-tag/tagDemo";

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
        "tag-wrapper grid w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3",
        className,
      )}
    >
      {tagList.map((tag) => (
        <TagDemo
          key={tag.id}
          className={twMerge(
            "tag-picker-item hover:bg-neutral_light w-[100px] p-2!",
            value === tag.id &&
              "bg-neutral_light !border-primary scale-105 border-3 border-solid shadow-md",
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

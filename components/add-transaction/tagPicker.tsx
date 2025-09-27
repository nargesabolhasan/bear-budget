"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { TagInfoTransaction, TagType } from "@/types/global";
import TagDemo from "@/components/create-tag/tagDemo";

export type tagPickerType = {
  tagList: TagType[];
  onChange: ({ id, name, type, icon }: TagInfoTransaction) => void;
  value: { id: string; name: string };
  className?: string;
};

const TagPicker = ({
  tagList,
  value = { id: "", name: "" },
  onChange,
  className,
}: tagPickerType) => {
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const button = (e.target as HTMLButtonElement).closest(".tag-picker-item");
    if (button) {
      const id = button.getAttribute("data-tag-id") || "";
      const name = button.getAttribute("data-tag-name") || "";
      const type = button.getAttribute("data-tag-type") || "";
      const icon = button.getAttribute("data-tag-icon") || "";
      onChange({ id, name, type, icon });
    }
  };

  return (
    <div
      onClick={handleSelect}
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
          dataTagId={tag.id}
        />
      ))}
    </div>
  );
};

export default TagPicker;

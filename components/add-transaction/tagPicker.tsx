"use client";

import React from "react";
import twMerge from "@/utils/utils";
import { TagType } from "@/types/global";
import TagDemo from "@/components/create-tag/tagDemo";

export type tagPickerType = {
  tagList: TagType[];
  onChange: (tagId: TagType["id"]) => void;
  value: TagType["id"];
};

const TagPicker = ({ tagList, value = "", onChange }: tagPickerType) => {
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const button = (e.target as HTMLButtonElement).closest(".tag-picker-item");
    if (button) {
      const id = button.getAttribute("data-tag-id") || "";
      onChange(id);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={twMerge(
        "tag-wrapper w-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3"
      )}
    >
      {tagList.map((tag) => (
        <TagDemo
          className={twMerge(
            "tag-picker-item w-[100px] p-2!",
            value === tag.id &&
              "bg-placeholder_light border-solid border-2 border-dark!"
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

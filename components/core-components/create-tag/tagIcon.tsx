import { iconList } from "@/constant/icons";
import { TagType } from "@/types/global";
import React from "react";
import { twMerge } from "tailwind-merge";

const TagIcon = ({ tag }: { tag: TagType | null }) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);

  return (
    <div
      className={twMerge(
        "shadow-dark top-1 flex size-11.25 flex-col items-center justify-center rounded-full p-3 shadow-sm print:left-0",
        tag?.color?.color || "",
      )}
    >
      <Icon fontSize={"large"} />
    </div>
  );
};

export default TagIcon;

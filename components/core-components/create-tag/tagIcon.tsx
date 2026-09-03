import { DEFAULT_ICON_ID, iconList } from "@/constant/icons";
import { TagType } from "@/types/global";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  tag: TagType | null;
  size?: string;
  iconClassName?: string;
  fontSize?: "large" | "small" | "inherit" | "medium";
  showIconColor?: boolean;
};

const TagIcon = ({
  tag,
  size = "size-11.25",
  iconClassName,
  fontSize = "large",
  showIconColor = true,
}: Props) => {
  const Icon =
    iconList.get(tag?.icon || DEFAULT_ICON_ID)?.icon || (() => <></>);

  return (
    <div
      className={twMerge(
        "shadow-dark top-1 flex flex-col items-center justify-center rounded-full p-3 shadow-xs print:top-0! print:left-0!",
        (showIconColor && tag?.color?.color) || "",
        size,
      )}
    >
      <Icon fontSize={fontSize} className={iconClassName && iconClassName} />
    </div>
  );
};

export default TagIcon;

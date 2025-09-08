import React from "react";
import { TagFormData } from "@/components/create-tag/type";
import twMerge from "@/utils/utils";
import { iconList } from "@/constant/icons";

const TagDemo = ({
  demoTitle,
  icon,
  name,
  color,
  transactionType,
  className,
  dataTagId = "",
}: TagFormData & {
  demoTitle?: string;
  className?: string;
  dataTagId?: string;
}) => {
  const Icon = iconList.get(icon || "0")?.icon;
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 mx-auto justify-center items-center bg-gray-100 border border-dashed border-gray-400 p-4 rounded-lg",
        className && className
      )}
      data-tag-id={dataTagId}
      data-tag-name={name}
      dir={"auto"}
    >
      <div className={"flex flex-col gap-2 items-start w-full"}>
        {demoTitle && <h3 className={"flex gap-1 flex-row"}>{demoTitle}</h3>}
      </div>
      <span className={"block text-md text-dark"}>{name ?? " "}</span>
      <i
        className={twMerge(
          "size-[50px] rounded-full flex justify-center items-center",
          color.color
        )}
      >
        {Icon ? <Icon /> : <></>}
      </i>
      <h4 className={"mx-auto text-placeholder"}>{transactionType}</h4>
    </div>
  );
};

export default TagDemo;

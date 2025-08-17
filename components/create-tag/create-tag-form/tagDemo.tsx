import React from "react";
import { TagFormData } from "@/components/create-tag/create-tag-form/type";
import twMerge from "@/libs/utils";
import { iconList } from "@/constant/icons";

const TagDemo = ({
  demoTitle,
  icon,
  name,
  color,
  transactionType,
}: TagFormData & {
  demoTitle?: string;
}) => {
  const Icon = iconList.get(icon || "0")?.icon;
  return (
    <div
      className={
        "transition-all delay-500 flex flex-col gap-2 mx-auto justify-center items-center bg-gray-100 p-4 rounded-lg"
      }
    >
      <div className={"flex flex-col gap-2 items-start w-full"}>
        {demoTitle && <h3 className={"flex gap-1 flex-row"}>{demoTitle}</h3>}
        <b className={"italic"}>type : {transactionType}</b>
      </div>
      <i
        className={twMerge(
          "size-[50px] rounded-full flex justify-center items-center",
          color.color
        )}
      >
        {Icon ? <Icon /> : <></>}
      </i>
      <span className={"block text-md text-gray-900"}>{name ?? " "}</span>
    </div>
  );
};

export default TagDemo;

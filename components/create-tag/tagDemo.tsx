import React from "react";
import { TagFormData } from "@/components/create-tag/type";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";

const TagDemo = ({
  demoTitle,
  icon,
  name,
  color,
  transactionType,
  className,
  onClick,
}: TagFormData & {
  demoTitle?: string;
  className?: string;
  onClick?: () => void;
}) => {
  const Icon = iconList.get(icon || "0")?.icon;
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 mx-auto justify-center items-center border border-dashed border-placeholder p-4 rounded-lg transition duration-150 ease-in-out",
        className && className
      )}
      dir={"auto"}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className={"flex flex-col gap-2 items-start w-full"}>
        {demoTitle && <h3 className={"text-center w-full"}>{demoTitle}</h3>}
      </div>
      {name && (
        <span className={"block text-md text-dark_surface"}>{name ?? " "}</span>
      )}
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

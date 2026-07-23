import React from "react";
import { TagFormData } from "@/components/core-components/create-tag/type";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";
import i18next from "i18next";
import i18n from "@/i18n/config";
import { SYSTEM_TAG } from "@/constant/global";

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
        "border-placeholder mx-auto flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-4",
        className && className,
      )}
      dir={"auto"}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className={"flex w-full flex-col items-start gap-2"}>
        {demoTitle && <h3 className={"w-full text-center"}>{demoTitle}</h3>}
      </div>
      {!!name && (
        <span
          className={
            "text-md text-dark_surface overflow-wrap block text-pretty break-words break-all whitespace-normal"
          }
        >
          {name === SYSTEM_TAG
            ? i18n.t(`transactions.system.previousMonth`)
            : name}
        </span>
      )}
      <i
        className={twMerge(
          "flex size-[50px] items-center justify-center rounded-full",
          color.color,
        )}
      >
        {Icon ? <Icon sx={{ fontSize: 30 }} /> : <></>}
      </i>
      <h4 className={"text-placeholder mx-auto"}>
        {i18next.t(`transactions.${transactionType}`)}
      </h4>
    </div>
  );
};

export default TagDemo;

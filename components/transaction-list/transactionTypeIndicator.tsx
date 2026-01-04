import React from "react";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";
import { TagType } from "@/types/global";

const TransactionTypeIndicator = ({ tag }: { tag: TagType }) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);

  return (
    <div className={"flex flex-col items-center justify-center"}>
      <div
        className={twMerge(
          "print:left-0 top-1 size-[40px] flex flex-col items-center justify-center rounded-full p-3 shadow-sm shadow-dark m-2",
          tag?.color.color
        )}
      >
        <Icon />
      </div>
      <span
        className={"text-olive"}
        style={{ fontFamily: "PlaywriteNZGuides" }}
      >
        {tag?.transactionType[0].toUpperCase()}
      </span>
    </div>
  );
};

export default TransactionTypeIndicator;

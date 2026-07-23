import React from "react";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";
import { TagType } from "@/types/global";
import i18next from "i18next";

const TransactionTypeIndicator = ({ tag }: { tag: TagType }) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);

  return (
    <div className={"flex w-[45] flex-col items-center justify-center gap-2"}>
      <div
        className={twMerge(
          "shadow-dark top-1 flex size-[45px] flex-col items-center justify-center rounded-full p-3 shadow-sm print:left-0",
          tag?.color.color,
        )}
      >
        <Icon fontSize={"large"} />
      </div>
      <span
        className={"text-olive text-center text-xs"}
        style={{
          fontFamily:
            i18next.language === "en-US"
              ? "PlaywriteNZGuides"
              : "playpenSansArabic",
        }}
      >
        {i18next.t(`transactions.${tag?.transactionType}`)}
      </span>
    </div>
  );
};

export default TransactionTypeIndicator;

import React from "react";
import { twMerge } from "tailwind-merge";
import { iconList } from "@/constant/icons";
import { TagType } from "@/types/global";
import i18next from "i18next";

const TransactionTypeIndicator = ({ tag }: { tag: TagType }) => {
  const Icon = iconList.get(tag?.icon || "0")?.icon || (() => <></>);

  return (
    <div className={"flex flex-col items-center justify-center gap-2 w-[45]"}>
      <div
        className={twMerge(
          "print:left-0 top-1 size-[45px] flex flex-col items-center justify-center rounded-full p-3 shadow-sm shadow-dark",
          tag?.color.color
        )}
      >
        <Icon fontSize={"large"} />
      </div>
      <span
        className={"text-olive text-xs text-center"}
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

import React from "react";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";
import { twMerge } from "tailwind-merge";
import { groupedStyles } from "@/utils/transactionGroupedStyles";

const TransactionTypeIndicator = ({ title }: { title: string }) => {
  return (
    <div
      className={twMerge(
        "relative -left-5 top-1 size-[50px] flex flex-col items-center justify-center rounded-full p-3 shadow-sm shadow-dark",
        groupedStyles(title)
      )}
    >
      <i>{transactionTypeIcon(title)}</i>
    </div>
  );
};

export default TransactionTypeIndicator;

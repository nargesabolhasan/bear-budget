import React from "react";
import { convertToCurrency } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";
import { TransactionEnum } from "@/types/global";

type Props = { title: TransactionEnum | string; totalAmount?: number };

const TransactionHeader = ({ title, totalAmount }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-t-lg p-2 flex flex-row justify-between gap-3 items-center border-b border-dashed border-placeholder"
      )}
    >
      <span className={"flex flex-row items-center justify-center gap-3"}>
        <i>{transactionTypeIcon(title)}</i>
        <h3 className={"text-xl"} style={{ fontFamily: "Satisfy" }}>
          {title}
        </h3>
      </span>
      {!!totalAmount && (
        <h3
          className={
            "text-pretty break-words whitespace-normal overflow-wrap break-all"
          }
        >
          T : {convertToCurrency(totalAmount)}
        </h3>
      )}
    </div>
  );
};

export default TransactionHeader;

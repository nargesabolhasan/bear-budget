import React from "react";
import twMerge, { convertToCurrency } from "@/utils/utils";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";
import { TransactionEnum } from "@/types/global";

type Props = { title: TransactionEnum | string; totalAmount?: number };

const TransactionHeader = ({ title, totalAmount }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-t-lg p-2 flex flex-row justify-between items-center",
        groupedStyles(title)
      )}
    >
      <span className={"flex flex-row items-center justify-center gap-3"}>
        <i>{transactionTypeIcon(title)}</i>
        <h3 className={"text-xl"}>{title}</h3>
      </span>
      {!!totalAmount && <h3>T : {convertToCurrency(totalAmount)}</h3>}
    </div>
  );
};

export default TransactionHeader;

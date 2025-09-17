"use client";
import React from "react";
import TransactionItems from "@/components/transaction-list/transactionItems";
import { TransactionEnum } from "@/types/global";
import twMerge from "@/utils/utils";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionHeader from "@/components/transaction-list/transactionHeader";
import { groupedStyles } from "@/utils/transactionGroupedStyles";

type Props = {
  groupedItems: [TransactionEnum, TransactionInfoType][];
};

const SuperGroupList = ({ groupedItems }: Props) => {
  return (
    <ul className={"flex flex-col gap-3 mx-auto w-fit"}>
      {groupedItems.map(([type, items], index) => (
        <li
          key={`${type}-${index}`}
          className={twMerge(
            "rounded-2xl flex flex-col gap-3 bg-neutral_light border-5",
            groupedStyles(type, "border")
          )}
        >
          <TransactionHeader title={type} totalAmount={items.totalAmount} />
          <TransactionItems
            transactionList={items.transactions}
            showTransactionType={false}
            showPrimaryBG={false}
            showDivider
          />
        </li>
      ))}
    </ul>
  );
};

export default SuperGroupList;

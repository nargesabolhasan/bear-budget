"use client";
import React from "react";
import TransactionItems from "@/components/transaction-list/transactionItems";
import { TransactionEnum } from "@/types/global";
import twMerge from "@/utils/utils";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionHeader from "@/components/transaction-list/transactionHeader";

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
            "rounded-2xl p-2 flex flex-col gap-y-4 border border-placeholder_light shadow-md"
          )}
        >
          <TransactionHeader title={type} totalAmount={items?.totalAmount} />
          <TransactionItems
            transactionList={items.transactions}
            showTransactionHeader={false}
            showPrimaryBG={false}
            showDivider
          />
        </li>
      ))}
    </ul>
  );
};

export default SuperGroupList;

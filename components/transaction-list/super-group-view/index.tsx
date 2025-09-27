"use client";
import React from "react";
import TransactionItems from "@/components/transaction-list";
import { TransactionEnum } from "@/types/global";
import { twMerge } from "tailwind-merge";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionHeader from "@/components/transaction-list/transactionHeader";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";

type Props = {
  groupedItems: [TransactionEnum, TransactionInfoType][];
};

const SuperGroupList = ({ groupedItems }: Props) => {
  return (
    <ul className={"w-full md:w-[500px] flex flex-col gap-3 mx-auto"}>
      <PrinterViewTitle title={"Grouped by Types :"} />
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

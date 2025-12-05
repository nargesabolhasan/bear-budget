"use client";
import React from "react";
import TransactionItems from "@/components/transaction-list/TransactionItems";
import { TransactionEnum } from "@/types/global";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionHeader from "@/components/transaction-list/transactionHeader";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";
import { TagsListType } from "@/store/tags/type";

type Props = {
  groupedItems: [TransactionEnum, TransactionInfoType][];
  tags: TagsListType;
};

const SuperGroupList = ({ groupedItems, tags }: Props) => {
  return (
    <ul
      className={
        "print-list w-full md:w-[500px] flex flex-col gap-5 mx-auto px-2 md:px-0"
      }
    >
      <PrinterViewTitle title={"Grouped by Types :"} />
      {groupedItems.map(([type, items], index) => (
        <li key={`${type}-${index}`}>
          <div
            className={
              "list-item-block force-block rounded-2xl p-2 flex flex-col gap-y-4 border border-placeholder_light2 shadow-md print:p-1"
            }
          >
            <TransactionHeader title={type} totalAmount={items?.totalAmount} />
            <TransactionItems
              tags={tags}
              transactionList={items.transactions}
              showTransactionHeader={false}
              showPrimaryBG={false}
              showDivider
              showTagIcon
              showTagIconColor
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SuperGroupList;

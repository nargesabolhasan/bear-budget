"use client";
import React from "react";
import TransactionItems from "@/components/core-components/transaction-list/TransactionItems";
import { TransactionEnum } from "@/types/global";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionHeader from "@/components/core-components/transaction-list/transactionHeader";
import PrinterViewTitle from "@/components/core-components/printer-demo/printerViewTitle";
import { TagsListType } from "@/store/tags/type";
import i18next from "i18next";

type Props = {
  groupedItems: [TransactionEnum, TransactionInfoType][];
  tags: TagsListType;
};

const SuperGroupList = ({ groupedItems, tags }: Props) => {
  return (
    <ul
      className={
        "print-list mx-auto flex w-full flex-col gap-5 px-2 md:w-full md:px-0"
      }
    >
      <PrinterViewTitle title={i18next.t("transactionList.groupedByType")} />
      {groupedItems.map(([type, items], index) => (
        <li key={`${type}-${index}`}>
          <div
            className={
              "list-item-block force-block border-placeholder_light2 flex flex-col gap-y-4 rounded-2xl border p-2 shadow-md print:p-1"
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

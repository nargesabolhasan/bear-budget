"use client";
import React from "react";
import TransactionItems from "@/components/transaction-list/super-group-view/transactionItems";
import { TransactionEnum } from "@/types/global";
import twMerge, { convertToCurrency } from "@/utils/utils";
import { TransactionInfoType } from "@/store/transaction/type";

type Props = {
  groupedItems: [TransactionEnum, TransactionInfoType][];
};

const SuperGroupList = ({ groupedItems }: Props) => {
  return (
    <ul className={"flex flex-col gap-3 mx-auto w-fit"}>
      {groupedItems.map(([type, items], index) => (
        <li key={`${type}-${index}`} className={"flex flex-col"}>
          <div
            className={twMerge(
              "bg-neutral_dark flex flex-row justify-between border-2 border-dashed border-primary border-b-0 rounded-t-lg p-3"
            )}
          >
            <h3 className={"font-bold"}>{type}</h3>
            <h3>T : {convertToCurrency(items.totalAmount)}</h3>
          </div>
          <hr className={"text-primary"} />

          <TransactionItems
            transactionList={items.transactions}
            transactionType={type as TransactionEnum}
          />
        </li>
      ))}
    </ul>
  );
};

export default SuperGroupList;

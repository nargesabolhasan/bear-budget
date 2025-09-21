"use client";

import twMerge from "@/utils/utils";
import { TransactionType } from "@/types/global";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import TransactionHeader from "@/components/transaction-list/transactionHeader";
import MainTransactionInfo from "@/components/transaction-list/mainTransactionInfo";
import React from "react";

type Props = {
  transactionList: TransactionType[];
  showTransactionType?: boolean;
  showPrimaryBG?: boolean;
  showDivider?: boolean;
  showTagIcon?: boolean;
};

const TransactionItems = ({
  transactionList,
  showTransactionType = true,
  showPrimaryBG = true,
  showDivider = false,
  showTagIcon = false,
}: Props) => {
  return (
    <ul
      className={twMerge(
        "flex flex-col items-center justify-center gap-3 px-1 py-3 rounded-lg",
        showPrimaryBG && "bg-primary_light"
      )}
    >
      {transactionList.map((transaction) => (
        <li
          key={`${transaction.id}-list-item`}
          className={twMerge(
            "w-[280px] flex flex-col rounded-lg bg-neutral_light",
            showDivider && "border",
            showDivider && groupedStyles(transaction.tag.type, "border")
          )}
        >
          {showTransactionType && (
            <TransactionHeader title={transaction.tag.type} />
          )}
          <div className={"p-3"}>
            <MainTransactionInfo
              tag={transaction.tag}
              amount={transaction.amount}
              date={transaction.date}
              showTagIcon={showTagIcon}
            />
            {showTagIcon && !!transaction?.description && (
              <hr
                className={
                  "opacity-30 my-2 h-0.5 border-0 rounded bg-placeholder"
                }
              />
            )}
            <p className={"text-placeholder text-pretty break-words"}>
              {transaction.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionItems;

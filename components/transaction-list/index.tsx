"use client";

import { twMerge } from "tailwind-merge";
import { TransactionType } from "@/types/global";
import TransactionHeader from "@/components/transaction-list/transactionHeader";
import React from "react";
import TransactionTypeIndicator from "@/components/transaction-list/transactionTypeIndicator";
import MainTransactionInfo from "@/components/transaction-list/mainTransactionInfo";

type Props = {
  transactionList: TransactionType[];
  showTransactionHeader?: boolean;
  showTransactionIndicator?: boolean;
  showPrimaryBG?: boolean;
  showDivider?: boolean;
  showTagIcon?: boolean;
};

const TransactionItems = ({
  transactionList,
  showTransactionHeader = true,
  showPrimaryBG = true,
  showTransactionIndicator = false,
  showDivider = false,
  showTagIcon = false,
}: Props) => {
  return (
    <ul
      className={twMerge(
        "w-full flex flex-col items-center justify-center gap-3 px-1 py-3 rounded-lg",
        showPrimaryBG && "bg-placeholder_light"
      )}
    >
      {transactionList.map((transaction) => (
        <li
          key={`${transaction.id}-list-item`}
          className={twMerge(
            "w-full flex flex-col bg-neutral_light rounded-lg",
            showDivider && "border border-placeholder_light"
          )}
        >
          {showTransactionHeader && (
            <TransactionHeader title={transaction.tag.type} />
          )}

          <div className={"flex flex-row items-stretch w-full"}>
            {showTransactionIndicator && (
              <TransactionTypeIndicator title={transaction.tag.type} />
            )}
            <MainTransactionInfo
              transaction={transaction}
              showTagIcon={showTagIcon}
              showTransactionIndicator={showTransactionIndicator}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionItems;

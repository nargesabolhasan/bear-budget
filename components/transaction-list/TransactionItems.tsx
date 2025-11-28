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
        "w-full flex flex-col items-center justify-center gap-4 rounded-xl",
        showPrimaryBG && "bg-primary_light p-2"
      )}
    >
      {transactionList.map((transaction) => (
        <li
          key={`${transaction.id}-list-item`}
          className={twMerge(
            "list-item-content w-full flex flex-col bg-neutral_light rounded-xl",
            showDivider && "border border-t-0 border-dashed border-placeholder"
          )}
        >
          {showTransactionHeader && (
            <TransactionHeader title={transaction.tag.type} />
          )}

          <div className={"flex flex-row items-stretch w-full"}>
            {showTransactionIndicator && (
              <TransactionTypeIndicator tag={transaction.tag} />
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

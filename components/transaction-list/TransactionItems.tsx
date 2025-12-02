"use client";

import { twMerge } from "tailwind-merge";
import { TransactionType } from "@/types/global";
import TransactionHeader from "@/components/transaction-list/transactionHeader";
import React from "react";
import TransactionTypeIndicator from "@/components/transaction-list/transactionTypeIndicator";
import MainTransactionInfo from "@/components/transaction-list/mainTransactionInfo";
import { useTagsStore } from "@/store/tags";

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
  const { tags } = useTagsStore();

  return (
    <ul
      className={twMerge(
        "print-list w-full flex flex-col items-center justify-center gap-4 print:!gap-1 rounded-xl",
        showPrimaryBG &&
          "bg-gradient-to-br from-light_mint to-hover_primary p-2 print:!p-3"
      )}
    >
      {transactionList.map((transaction) => (
        <li
          key={`${transaction.id}-list-item`}
          className={twMerge(
            "w-full flex flex-col bg-neutral_light rounded-xl",
            showDivider && "border border-t-0 border-dashed border-placeholder"
          )}
        >
          <div className={"list-item-block force-block"}>
            {showTransactionHeader && (
              <TransactionHeader
                title={tags?.[transaction.tag].transactionType}
              />
            )}

            <div className={"flex flex-row items-stretch w-full"}>
              {showTransactionIndicator && (
                <TransactionTypeIndicator tag={tags?.[transaction.tag]} />
              )}
              <MainTransactionInfo
                tags={tags}
                transaction={transaction}
                showTagIcon={showTagIcon}
                showTransactionIndicator={showTransactionIndicator}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionItems;

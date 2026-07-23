"use client";

import { twMerge } from "tailwind-merge";
import { TransactionType } from "@/types/global";
import TransactionHeader from "@/components/core-components/transaction-list/transactionHeader";
import React from "react";
import TransactionTypeIndicator from "@/components/core-components/transaction-list/transactionTypeIndicator";
import MainTransactionInfo from "@/components/core-components/transaction-list/mainTransactionInfo";
import { TagsListType } from "@/store/tags/type";

type Props = {
  tags: TagsListType;
  transactionList: TransactionType[];
  showTransactionHeader?: boolean;
  showTransactionIndicator?: boolean;
  showPrimaryBG?: boolean;
  showDivider?: boolean;
  showTagIcon?: boolean;
  showTagIconColor?: boolean;
};

const TransactionItems = ({
  tags,
  transactionList,
  showTransactionHeader = true,
  showPrimaryBG = true,
  showTransactionIndicator = false,
  showDivider = false,
  showTagIcon = false,
  showTagIconColor = false,
}: Props) => {
  return (
    <ul
      className={twMerge(
        "print-list flex w-full flex-col items-center justify-center gap-4 rounded-xl print:!gap-1",
        showPrimaryBG &&
          "border-placeholder_light2 border border-dashed p-2 print:!p-3",
      )}
    >
      {transactionList.map((transaction) => (
        <li
          key={`${transaction.id}-list-item`}
          className={twMerge(
            "bg-neutral_light flex w-full flex-col rounded-xl",
            showDivider && "border-placeholder border border-t-0 border-dashed",
          )}
        >
          <div className={"list-item-block force-block"}>
            {showTransactionHeader && (
              <TransactionHeader
                title={tags?.[transaction.tag].transactionType}
              />
            )}

            <div
              className={"flex w-full flex-row items-stretch gap-1 md:gap-3"}
            >
              {showTransactionIndicator && (
                <TransactionTypeIndicator tag={tags?.[transaction.tag]} />
              )}
              <MainTransactionInfo
                tags={tags}
                transaction={transaction}
                showTagIcon={showTagIcon}
                showTagIconColor={showTagIconColor}
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

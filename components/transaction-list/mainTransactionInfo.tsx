import React from "react";
import MainTransactionTitle from "@/components/transaction-list/mainTransactionTitle";
import { TransactionType } from "@/types/global";
import ActionButtons from "@/components/transaction-list/actionButtons";
import { twMerge } from "tailwind-merge";

type Props = {
  transaction: TransactionType;
  showTagIcon: boolean;
  showTransactionIndicator?: boolean;
};

const MainTransactionInfo = ({
  transaction,
  showTagIcon,
  showTransactionIndicator = false,
}: Props) => {
  return (
    <div
      className={twMerge(
        "overflow-x-auto p-3 grow flex flex-col items-end",
        showTransactionIndicator &&
          "relative -left-5 print:left-0 print:border-b"
      )}
    >
      <MainTransactionTitle
        tag={transaction.tag}
        amount={transaction.amount}
        date={transaction.date}
        showTagIcon={showTagIcon}
      />
      {showTagIcon && !!transaction?.description && (
        <hr
          className={"opacity-30 my-2 h-0.5 border-0 rounded bg-placeholder"}
        />
      )}
      <p
        className={
          "w-full text-placeholder text-pretty break-words whitespace-normal overflow-wrap break-all"
        }
      >
        {transaction.description}
      </p>
      <ActionButtons transaction={transaction} />
    </div>
  );
};

export default MainTransactionInfo;

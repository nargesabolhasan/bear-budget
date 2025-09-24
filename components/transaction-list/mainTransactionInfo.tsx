import React from "react";
import MainTransactionTitle from "@/components/transaction-list/mainTransactionTitle";
import { TransactionType } from "@/types/global";
import ActionButtons from "@/components/transaction-list/actionButtons";

type Props = {
  transaction: TransactionType;
  showTagIcon: boolean;
};

const MainTransactionInfo = ({ transaction, showTagIcon }: Props) => {
  return (
    <div className={"p-3 grow flex flex-col items-end"}>
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

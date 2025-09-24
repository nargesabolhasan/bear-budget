import React from "react";
import MainTransactionTitle from "@/components/transaction-list/mainTransactionTitle";
import { TransactionType } from "@/types/global";

type Props = {
  transaction: TransactionType;
  showTagIcon: boolean;
};

const MainTransactionInfo = ({ transaction, showTagIcon }: Props) => {
  return (
    <div className={"p-3 grow"}>
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
      <p className={"text-placeholder text-pretty break-words"}>
        {transaction.description}
      </p>
    </div>
  );
};

export default MainTransactionInfo;

"use client";
import React from "react";
import { useTransactionStore } from "@/store/transaction";

const TransactionList = () => {
  const { transactions } = useTransactionStore();
  return (
    <div className={"grid grid-cols-4 gap-x-2 gap-y-4 border border-gray-400"}>
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={"flex flex-col gap-3 p-2 text-blue-500"}
        >
          <span>{transaction.amount}</span>
          <span>{transaction.date}</span>
          <span>{transaction.tag}</span>
          <span>{transaction.description}</span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;

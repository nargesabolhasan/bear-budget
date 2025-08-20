"use client";
import React from "react";
import { useTransactionStore } from "@/store/transaction";
import { translationRoutes } from "@/constant/routes";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { TransactionType } from "@/types/global";
import { openDialog } from "@/components/molecules/dialogContainer";

const TransactionList = () => {
  const { transactions, removeTransaction, clearAll } = useTransactionStore();

  const handleDelete = (transaction: TransactionType) => {
    openDialog({
      title: "Remove transaction",
      hint: (
        <span>
          Remove : <strong>{transaction.amount}</strong> as
          <strong>{transaction.tag}</strong>
        </span>
      ),
      confirmHandler: () => {
        removeTransaction(transaction.id);
      },
    });
  };

  const clearAllTransactions = () => {
    openDialog({
      title: "Clear All",
      hint: "Do you want to remove all transaction ?",
      confirmHandler: () => clearAll(),
    });
  };

  return (
    <div className={"grid grid-cols-4 gap-x-2 gap-y-4 border border-gray-400"}>
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={"flex flex-col gap-3 p-2 text-blue-500"}
        >
          <IconButton onClick={() => handleDelete(transaction)}>
            <DeleteIcon />
          </IconButton>

          <Link href={translationRoutes.editTransaction(transaction.id)}>
            <EditIcon />
          </Link>
          <span>{transaction.amount}</span>
          <span>{transaction.date}</span>
          <span>{transaction.tag}</span>
          <span>{transaction.description}</span>
        </div>
      ))}
      <IconButton onClick={clearAllTransactions}>
        delete all transactions
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TransactionList;

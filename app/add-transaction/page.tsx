"use client";
import React from "react";
import TransactionForm from "@/components/add-transaction/transactionForm";
import { FORMS_WRAPPER_CLASS } from "@/constant";
import { TransactionFormData } from "@/components/add-transaction/type";
import { useTransactionStore } from "@/store/transaction";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const AddTransaction = ({}) => {
  const { addTransaction } = useTransactionStore();
  const submitHandler = (data: TransactionFormData) => {
    addTransaction({ ...data, id: uuidv4() });
    toast.success(<span>new Transaction added successfully!</span>);
  };

  return (
    <div className={FORMS_WRAPPER_CLASS}>
      <TransactionForm submitHandler={submitHandler} />
    </div>
  );
};

export default AddTransaction;

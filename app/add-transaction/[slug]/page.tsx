"use client";
import React, { use } from "react";
import TransactionForm from "@/components/add-transaction/transactionForm";
import { useTransactionStore } from "@/store/transaction";
import { toast } from "sonner";
import {
  FormTransactionEnum,
  TransactionFormData,
} from "@/components/add-transaction/type";

type Props = {
  params: Promise<{ slug: string }>;
};

const EditTransaction = ({ params }: Props) => {
  const { slug } = use(params);
  const { transactions, editTransaction } = useTransactionStore();
  const defaultValue = transactions.find((item) => item.id === slug);

  const submitHandler = (formData: TransactionFormData) => {
    if (!defaultValue) return;
    editTransaction(defaultValue.id, formData);
    toast.success(
      <span>
        <strong>{formData[FormTransactionEnum.AMOUNT]}</strong> was updated
        successfully!
      </span>
    );
  };
  return <TransactionForm submitHandler={submitHandler} {...defaultValue} />;
};

export default EditTransaction;

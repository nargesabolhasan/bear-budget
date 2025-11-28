"use client";
import React, { use } from "react";
import TransactionForm from "@/components/add-transaction/transactionForm";
import { useTransactionStore } from "@/store/transaction";
import { toast } from "sonner";
import {
  FormTransactionEnum,
  TransactionFormData,
} from "@/components/add-transaction/type";
import BackButton from "@/components/molecules/backButton";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const EditTransaction = ({ params }: Props) => {
  const { slug } = use(params);
  const { editTransaction, getTransactions } = useTransactionStore();
  const { date } = useFilteredDateContext();
  const router = useRouter();

  const defaultValue = getTransactions(date.year, date.month).find(
    (transaction) => transaction.id === slug
  );

  const submitHandler = (formData: TransactionFormData) => {
    if (!defaultValue) return;
    editTransaction(defaultValue.id, formData, date.year, date.month);

    toast.success(
      <span>
        <strong>{formData[FormTransactionEnum.AMOUNT]}</strong> was updated
        successfully!
      </span>
    );
    router.back();
  };

  return (
    <TransactionForm
      title={
        <span className={"flex flex-row"}>
          <BackButton />
          <h4 className={"text-center grow"}>Edit Transaction</h4>
        </span>
      }
      submitHandler={submitHandler}
      {...defaultValue}
    />
  );
};

export default EditTransaction;

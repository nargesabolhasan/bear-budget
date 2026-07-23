"use client";
import React, { use } from "react";
import TransactionForm from "@/components/core-components/add-transaction/transactionForm";
import { useTransactionStore } from "@/store/transaction";
import { toast } from "sonner";
import {
  FormTransactionEnum,
  TransactionFormData,
} from "@/components/core-components/add-transaction/type";
import BackButton from "@/components/molecules/backButton";
import { useFilteredDateContext } from "@/context/filteredDateContext";
import { useRouter } from "next/navigation";
import i18next from "i18next";
import useCalendarUtils from "@/hooks/useCalendarUtils";

type Props = {
  params: Promise<{ slug: string }>;
};

const EditTransaction = ({ params }: Props) => {
  const { slug } = use(params);
  const { editTransaction, getTransactions } = useTransactionStore();
  const { date } = useFilteredDateContext();
  const router = useRouter();

  const { isJalali } = useCalendarUtils();

  const defaultValue = getTransactions(
    date.year,
    date.month,
    isJalali,
    date.notIso.month,
  ).find((transaction) => transaction.id === slug);

  const submitHandler = (formData: TransactionFormData) => {
    if (!defaultValue) return;
    editTransaction(defaultValue.id, formData);

    toast.success(
      <span>
        <strong>{formData[FormTransactionEnum.AMOUNT]}</strong>{" "}
        {i18next.t("global.update")}
      </span>,
    );
    router.back();
  };

  return (
    <TransactionForm
      title={
        <span className={"flex flex-row items-center"} dir={"ltr"}>
          <BackButton />
          <h4 className={"grow text-center"}>Edit Transaction</h4>
        </span>
      }
      submitHandler={submitHandler}
      {...defaultValue}
    />
  );
};

export default EditTransaction;

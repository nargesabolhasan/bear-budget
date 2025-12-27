"use client";
import React from "react";
import TransactionForm from "@/components/add-transaction/transactionForm";
import { TransactionFormData } from "@/components/add-transaction/type";
import { useTransactionStore } from "@/store/transaction";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { FORMS_WRAPPER_CLASS } from "@/constant/className";
import i18next from "i18next";
import i18n from "i18next";

const AddTransaction = ({}) => {
  const { addTransaction } = useTransactionStore();
  const submitHandler = (data: TransactionFormData) => {
    addTransaction({ ...data, id: uuidv4() });
    toast.success(
      <span>
        {i18next.t("global.successValue", {
          value: i18next.t("global.transaction"),
        })}
      </span>
    );
  };

  return (
    <div className={FORMS_WRAPPER_CLASS}>
      <TransactionForm submitHandler={submitHandler} />
    </div>
  );
};

export default AddTransaction;

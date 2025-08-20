"use client";
import React from "react";
import TransactionForm from "@/components/add-transaction/transactionForm";
import { FORMS_WRAPPER_CLASS } from "@/constant";
import { TransactionFormData } from "@/components/add-transaction/type";

const AddTransaction = () => {
  const submitHandler = (data: TransactionFormData) => {
    console.log(data);
  };
  return (
    <div className={FORMS_WRAPPER_CLASS}>
      <TransactionForm submitHandler={submitHandler} />
    </div>
  );
};

export default AddTransaction;

import React from "react";
import NewItemCards from "@/components/core-components/home/newItemCards";
import TransactionSummery from "@/components/core-components/home/transactionSummery";
import FinancialSummery from "@/components/core-components/home/financial-summery";

export default function Home() {
  return (
    <div
      className={"mx-auto mt-5 flex w-full flex-col gap-3 pb-10 md:w-[500px]"}
    >
      <TransactionSummery />
      {/* <NewItemCards /> */}
      <FinancialSummery />
    </div>
  );
}

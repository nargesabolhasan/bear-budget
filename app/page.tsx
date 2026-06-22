import React from "react";
import NewItemCards from "@/components/inner-components/home/newItemCards";
import TransactionSummery from "@/components/inner-components/home/transactionSummery";
import FinancialSummery from "@/components/inner-components/home/financial-summery";

export default function Home() {
  return (
    <div
      className={"mt-5 mx-auto flex flex-col gap-3 w-full md:w-[500px] pb-10"}
    >
      <TransactionSummery />
      {/* <NewItemCards /> */}
      <FinancialSummery />
    </div>
  );
}

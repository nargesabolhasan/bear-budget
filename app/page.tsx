import React from "react";
import NewItemCards from "@/components/home/newItemCards";
import TransactionSummery from "@/components/home/transactionSummery";
import Summery from "@/components/summery";

export default function Home() {
  return (
    <div
      className={"mt-5 mx-auto flex flex-col gap-3 w-full md:w-[500px] pb-10"}
    >
      <TransactionSummery />
      <NewItemCards />
      <Summery />
    </div>
  );
}

import React from "react";
import NewItemCards from "@/components/home/newItemCards";
import TransactionSummery from "@/components/home/transactionSummery";

export default function Home() {
  return (
    <main className={"mt-5 mx-auto flex flex-col gap-3 w-full md:w-[500px]"}>
      <TransactionSummery />
      <NewItemCards />
    </main>
  );
}

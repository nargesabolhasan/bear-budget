"use client";
import React from "react";
import { TransactionType } from "@/types/global";
import TransactionItems from "@/components/transaction-list/TransactionItems";
import { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";

const AllTransactions = ({
  transactions,
}: {
  transactions: TransactionType[];
}) => {
  const { paginated, page, setPage, pageCount } = usePaginationData(
    transactions,
    ROWS_PER_PAGE
  );

  return (
    <div className={"md:w-[500px] flex flex-col gap-3"}>
      <PrinterViewTitle title={"All Transactions:"} />
      <TransactionItems
        transactionList={paginated}
        showTransactionHeader={false}
        showTransactionIndicator
      />
      {/*<IPagination*/}
      {/*  count={pageCount}*/}
      {/*  page={page}*/}
      {/*  onChange={(event: React.ChangeEvent<unknown>, pageN: number) =>*/}
      {/*    setPage(pageN)*/}
      {/*  }*/}
      {/*/>*/}
    </div>
  );
};

export default AllTransactions;

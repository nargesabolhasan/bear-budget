"use client";
import React from "react";
import { TransactionType } from "@/types/global";
import TransactionItems from "@/components/transaction-list";
import IPagination, { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";

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
    <div className={"flex flex-col gap-3"}>
      <TransactionItems
        transactionList={paginated}
        showTransactionHeader={false}
        showTransactionIndicator
      />
      <IPagination
        count={pageCount}
        page={page}
        onChange={(event: React.ChangeEvent<unknown>, pageN: number) =>
          setPage(pageN)
        }
      />
    </div>
  );
};

export default AllTransactions;

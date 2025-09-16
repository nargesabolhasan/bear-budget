"use client";
import React from "react";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionItems from "@/components/transaction-list/super-group-view/transactionItems";
import { TransactionEnum } from "@/types/global";
import IPagination, { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";
import { convertToCurrency } from "@/utils/utils";

type Props = {
  transactions: TransactionInfoType;
  transactionType: TransactionEnum | string;
};

const GroupedTransaction = ({ transactions, transactionType }: Props) => {
  const { paginated, page, setPage, pageCount } = usePaginationData(
    transactions.transactions,
    ROWS_PER_PAGE
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className={"font-semibold"}>{transactionType}</h3>
      <h3 className="flex flex-row gap-3">
        <h4>Total amount :</h4>
        {convertToCurrency(transactions.totalAmount)}
      </h3>
      <TransactionItems transactionList={paginated} />
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

export default GroupedTransaction;

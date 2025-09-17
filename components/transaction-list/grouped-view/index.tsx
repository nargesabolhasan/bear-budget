"use client";
import React from "react";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionItems from "@/components/transaction-list/transactionItems";
import { TransactionEnum } from "@/types/global";
import IPagination, { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";
import twMerge, { convertToCurrency } from "@/utils/utils";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";

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
    <div
      className={"w-[300px] flex flex-col items-center justify-center mx-auto"}
    >
      <div
        className={twMerge(
          "text-xl w-full p-3 rounded-lg flex flex-row justify-between",
          groupedStyles(transactionType)
        )}
      >
        <span className={"flex flex-row gap-3 items-center"}>
          <i>{transactionTypeIcon(transactionType)}</i>
          <h3 className={"font-semibold"}>{transactionType}</h3>
        </span>

        <h3 className="flex flex-row gap-3">
          {convertToCurrency(transactions.totalAmount)}
        </h3>
      </div>

      <TransactionItems
        transactionList={paginated}
        showPrimaryBG={false}
        showTransactionType={false}
        showTagIcon
        showDivider
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

export default GroupedTransaction;

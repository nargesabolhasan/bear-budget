"use client";
import React from "react";
import { TransactionInfoType } from "@/store/transaction/type";
import TransactionItems from "@/components/transaction-list";
import { TransactionEnum } from "@/types/global";
import IPagination, { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";
import twMerge, { convertToCurrency } from "@/utils/utils";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";
import { Render } from "@/utils/render";

type Props = {
  transactions: TransactionInfoType;
  transactionType: TransactionEnum | string;
};

const FilterView = ({ transactions, transactionType }: Props) => {
  const { paginated, page, setPage, pageCount } = usePaginationData(
    transactions?.transactions,
    ROWS_PER_PAGE
  );

  return (
    <div className={"w-full flex flex-col items-center justify-center mx-auto"}>
      <div
        className={twMerge(
          "overflow-x-auto text-lg w-full p-3 rounded-lg flex flex-row justify-between items-center gap-2",
          groupedStyles(transactionType)
        )}
      >
        <span className={"flex flex-row gap-2 items-center"}>
          <i>{transactionTypeIcon(transactionType)}</i>
          <h3 className={"font-semibold"}>{transactionType}</h3>
        </span>
        <h3 className="flex flex-row gap-3">
          {convertToCurrency(transactions?.totalAmount)}
        </h3>
      </div>
      <Render
        when={!!transactions?.transactions}
        fallback={
          <span className={"p-3 w-[280px] text-center"}> ! no item</span>
        }
      >
        <>
          <TransactionItems
            transactionList={paginated}
            showPrimaryBG={false}
            showTransactionHeader={false}
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
        </>
      </Render>
    </div>
  );
};

export default FilterView;

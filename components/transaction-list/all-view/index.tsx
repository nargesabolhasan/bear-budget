"use client";
import React from "react";
import { TransactionType } from "@/types/global";
import TransactionItems from "@/components/transaction-list/TransactionItems";
import IPagination, { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";
import PrinterViewTitle from "@/components/printer-demo/printerViewTitle";
import { TagsListType } from "@/store/tags/type";
import SearchBar from "@/components/search";
import useSearchTransaction from "@/hooks/useSearchTransaction";
import { Render } from "@/utils/render";
import NotFoundItem from "@/components/search/NotFoundItem";
import i18next from "i18next";

const AllTransactions = ({
  transactions,
  tags,
}: {
  transactions: TransactionType[];
  tags: TagsListType;
}) => {
  const { onSearch, searchResult, notFound } = useSearchTransaction({
    allTransactions: transactions,
    tags,
  });

  const { paginated, page, setPage, pageCount, showPagination } =
    usePaginationData(searchResult, ROWS_PER_PAGE);

  return (
    <div className={"md:w-[500px] flex flex-col gap-3"}>
      <PrinterViewTitle
        title={
          i18next.t("transactionList.all") +
          " " +
          i18next.t("global.transactions")
        }
      />
      {transactions.length > 0 && (
        <SearchBar onSearch={onSearch} className={"mb-3"} />
      )}
      <Render when={!notFound} fallback={<NotFoundItem />}>
        <TransactionItems
          tags={tags}
          transactionList={paginated}
          showTransactionHeader={false}
          showTransactionIndicator
        />
      </Render>
      <IPagination
        count={pageCount}
        page={page}
        onChange={(event: React.ChangeEvent<unknown>, pageN: number) =>
          setPage(pageN)
        }
        showPagination={showPagination}
      />
    </div>
  );
};

export default AllTransactions;

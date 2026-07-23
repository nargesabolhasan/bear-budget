"use client";
import React from "react";
import { TransactionInfoType } from "@/store/transaction/type";
import { TransactionEnum } from "@/types/global";
import IPagination, { ROWS_PER_PAGE } from "@/components/molecules/pagination";
import usePaginationData from "@/hooks/usePagination";
import { convertToCurrency } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";
import { Render } from "@/utils/render";
import TransactionItems from "@/components/core-components/transaction-list/TransactionItems";
import { TagsListType } from "@/store/tags/type";
import i18next from "i18next";

type Props = {
  transactions: TransactionInfoType;
  transactionType: TransactionEnum | string;
  tags: TagsListType;
};

const FilterView = ({ transactions, transactionType, tags }: Props) => {
  const { paginated, page, setPage, pageCount, showPagination } =
    usePaginationData(transactions?.transactions, ROWS_PER_PAGE);

  return (
    <div
      className={
        "mx-auto flex w-full flex-col items-center justify-center md:w-full"
      }
    >
      <div
        className={twMerge(
          "flex w-full flex-row items-center justify-between overflow-x-auto rounded-xl rounded-b-none p-3 text-lg",
          groupedStyles(transactionType),
        )}
      >
        <span className={"flex flex-row items-center gap-2"}>
          <i>{transactionTypeIcon(transactionType)}</i>
          <h3
            className={"text-dark font-semibold"}
            style={{
              fontFamily:
                i18next.language === "en-US"
                  ? "PlaywriteNZGuides"
                  : "playpenSansArabic",
            }}
          >
            {i18next.t(`transactions.${transactionType}`)}
          </h3>
        </span>
        <h3 className="text-dark flex flex-row gap-3">
          {convertToCurrency(transactions?.totalAmount)}
        </h3>
      </div>
      <Render
        when={!!transactions?.transactions}
        fallback={
          <span
            className={twMerge(
              "text-dark w-full rounded-b-xl p-3 text-center",
              groupedStyles(transactionType),
            )}
          >
            {i18next.t("transactionList.emptyGroup")}
          </span>
        }
      >
        <>
          <div
            className={twMerge(
              "w-full rounded-b-xl p-1",
              groupedStyles(transactionType),
            )}
          >
            <TransactionItems
              tags={tags}
              transactionList={paginated}
              showPrimaryBG={false}
              showTransactionHeader={false}
              showTagIcon
              showDivider
            />
          </div>
          <IPagination
            count={pageCount}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, pageN: number) =>
              setPage(pageN)
            }
            showPagination={showPagination}
          />
        </>
      </Render>
    </div>
  );
};

export default FilterView;

"use client";
import React, { useMemo } from "react";
import TransactionItems from "@/components/core-components/transaction-list/TransactionItems";
import { TagType, TransactionType } from "@/types/global";
import PrinterViewTitle from "@/components/core-components/printer-demo/printerViewTitle";
import { TagsListType } from "@/store/tags/type";
import { convertToCurrency } from "@/utils/utils";
import { iconList } from "@/constant/icons";
import { groupedStyles } from "@/utils/transactionGroupedStyles";
import { twMerge } from "tailwind-merge";
import i18next from "i18next";
import TagIcon from "../../create-tag/tagIcon";

type TagGroup = {
  tag: TagType | null;
  transactions: TransactionType[];
  totalAmount: number;
};

type Props = {
  transactions: TransactionType[];
  tags: TagsListType;
};

const SuperGroupList = ({ transactions, tags }: Props) => {
  const groupedByTag = useMemo(() => {
    const groups = transactions.reduce<Record<string, TagGroup>>((acc, tx) => {
      const tagId = tx.tag || "uncategorized";
      if (!acc[tagId]) {
        acc[tagId] = {
          tag: tags?.[tagId] ?? null,
          transactions: [],
          totalAmount: 0,
        };
      }
      acc[tagId].transactions.push(tx);
      acc[tagId].totalAmount += Number(tx.amount) || 0;
      return acc;
    }, {});

    return Object.entries(groups).sort(([, a], [, b]) =>
      (a.tag?.name || "").localeCompare(b.tag?.name || ""),
    );
  }, [transactions, tags]);

  return (
    <ul
      className={
        "print-list mx-auto flex w-full flex-col gap-5 px-2 md:w-full md:px-0"
      }
    >
      <PrinterViewTitle title={i18next.t("transactionList.groupedByTag")} />
      {groupedByTag.map(([tagId, group]) => {
        const title =
          group.tag?.name || i18next.t("transactionList.uncategorized");

        return (
          <li key={tagId}>
            <div
              className={twMerge(
                "list-item-block force-block flex flex-col gap-y-4 rounded-3xl p-3 shadow-md print:p-1",
                group.tag?.color?.color ?? "",
              )}
            >
              <div
                className={twMerge(
                  "border-placeholder flex flex-row items-center justify-between gap-3 rounded-t-lg border-b border-dashed p-2",
                )}
              >
                {/* <TransactionTypeIndicator tag={group?.tag as TagType} /> */}

                <span
                  className={"flex flex-row items-center justify-center gap-3"}
                >
                  <TagIcon tag={group.tag} />
                  <h3 className={"text-xl"}>{title}</h3>
                </span>
                <h3
                  className={
                    "overflow-wrap text-pretty wrap-break-word break-all whitespace-normal"
                  }
                >
                  T : {convertToCurrency(group.totalAmount)}
                </h3>
              </div>
              <span>
                {"("}
                {i18next.t(`transactions.${group?.tag?.transactionType}`)}
                {")"}
              </span>
              <TransactionItems
                tags={tags}
                transactionList={group.transactions}
                showTransactionHeader={false}
                showPrimaryBG={false}
                showDivider
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SuperGroupList;

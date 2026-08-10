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
        const Icon =
          iconList.get(group.tag?.icon || "0")?.icon || (() => <></>);
        const title =
          group.tag?.name || i18next.t("transactionList.uncategorized");

        return (
          <li key={tagId}>
            <div
              className={
                "list-item-block force-block border-placeholder_light2 flex flex-col gap-y-4 rounded-2xl border p-2 shadow-md print:p-1"
              }
            >
              <div
                className={twMerge(
                  "border-placeholder flex flex-row items-center justify-between gap-3 rounded-t-lg border-b border-dashed p-2",
                )}
              >
                <span
                  className={"flex flex-row items-center justify-center gap-3"}
                >
                  <Icon
                    fontSize="large"
                    className={twMerge(
                      "rounded-full p-1 opacity-90",
                      group.tag?.transactionType
                        ? groupedStyles(group.tag.transactionType)
                        : "bg-primary_light",
                    )}
                  />
                  <h3 className={"text-xl"}>{title}</h3>
                </span>
                <h3
                  className={
                    "overflow-wrap text-pretty break-words break-all whitespace-normal"
                  }
                >
                  T : {convertToCurrency(group.totalAmount)}
                </h3>
              </div>
              <TransactionItems
                tags={tags}
                transactionList={group.transactions}
                showTransactionHeader={false}
                showPrimaryBG={false}
                showDivider
                showTransactionIndicator
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SuperGroupList;

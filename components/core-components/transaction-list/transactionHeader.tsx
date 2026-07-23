"use client";
import React from "react";
import { convertToCurrency } from "@/utils/utils";
import { twMerge } from "tailwind-merge";
import { transactionTypeIcon } from "@/utils/transactionTypeIcon";
import { TransactionEnum } from "@/types/global";
import { useTranslation } from "react-i18next";

type Props = { title: TransactionEnum | string; totalAmount?: number };

const TransactionHeader = ({ title, totalAmount }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={twMerge(
        "border-placeholder flex flex-row items-center justify-between gap-3 rounded-t-lg border-b border-dashed p-2",
      )}
    >
      <span className={"flex flex-row items-center justify-center gap-3"}>
        <i>{transactionTypeIcon(title)}</i>
        <h3 className={"text-xl"} style={{ fontFamily: "Satisfy" }}>
          {t(`transactions.${title}`)}
        </h3>
      </span>
      {!!totalAmount && (
        <h3
          className={
            "overflow-wrap text-pretty break-words break-all whitespace-normal"
          }
        >
          T : {convertToCurrency(totalAmount)}
        </h3>
      )}
    </div>
  );
};

export default TransactionHeader;

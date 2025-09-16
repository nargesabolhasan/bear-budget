"use client";

import twMerge, { convertToCurrency } from "@/utils/utils";
import { TransactionEnum, TransactionType } from "@/types/global";
import { bgHandler } from "@/utils/transactionBG";

type Props = {
  transactionList: TransactionType[];
  transactionType?: TransactionEnum;
};

const ITEM_BORDER = "border border-placeholder p-2 rounded-lg";
const TransactionItems = ({ transactionList, transactionType }: Props) => {
  return (
    <ul
      className={
        "flex flex-col gap-3 border-2 border-dashed border-primary border-t-0 rounded-b-lg p-3"
      }
    >
      {transactionList.map((transaction) => (
        <li
          key={`${transaction.id}-list-item`}
          className={twMerge(
            "border border-black w-[300px] flex flex-col gap-3 rounded-lg p-2",
            bgHandler(transactionType || transaction.tag.type)
          )}
        >
          <div
            className={twMerge(
              "flex flex-row gap-3 justify-between",
              ITEM_BORDER
            )}
          >
            <span>{convertToCurrency(transaction.amount)}</span>
            <span>{transaction.tag.name}</span>
          </div>
          <p className={twMerge("text-pretty break-words", ITEM_BORDER)}>
            {transaction.description}
          </p>
          <time className={twMerge()}>{transaction.date}</time>
        </li>
      ))}
    </ul>
  );
};

export default TransactionItems;

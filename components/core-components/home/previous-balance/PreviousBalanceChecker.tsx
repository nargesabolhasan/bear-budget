"use client";

import { colorList } from "@/constant/colors";
import { SYSTEM_TAG } from "@/constant/global";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import { usePreviousBalanceQuestion } from "@/hooks/usePreviousBalanceQuestion";
import { useTagsStore } from "@/store/tags";
import { useTransactionStore } from "@/store/transaction";
import { TransactionEnum } from "@/types/global";
import PreviousBalanceModal from "./previousBalanceModal";
import { DEFAULT_ICON_PREV_ID } from "@/constant/icons";

export const PREVIOUS_MONTH_TAG_ID_INCOME = "abcd1405";
export const PREVIOUS_MONTH_TAG_ID_SAVINGS = "abcd1406";

export default function PreviousBalanceChecker() {
  const { groupedByType } = useTransactionStore();
  const { isJalali, getPreviousMonth } = useCalendarUtils();

  const { isoYear, isoMonth, notIsoMonth } = getPreviousMonth();

  const previousMonthTransactions = groupedByType(
    isoYear,
    isoMonth,
    isJalali,
    notIsoMonth,
  );
  const remining =
    (previousMonthTransactions[TransactionEnum.INCOME]?.totalAmount || 0) -
    (previousMonthTransactions[TransactionEnum.EXPENSE]?.totalAmount || 0);

  const { showModal, balance, answer } = usePreviousBalanceQuestion(remining);

  const { addTransaction } = useTransactionStore();

  const { tags, createTag } = useTagsStore();

  const handleSubmit = (
    choice: TransactionEnum.INCOME | TransactionEnum.SAVE | "skip",
  ) => {
    const previousMonthTagId =
      choice === TransactionEnum.INCOME
        ? PREVIOUS_MONTH_TAG_ID_INCOME
        : PREVIOUS_MONTH_TAG_ID_SAVINGS;
    if (choice === "skip") {
      answer(choice);
      return;
    }
    const tagName = SYSTEM_TAG;

    const tagDescription =
      choice === TransactionEnum.INCOME
        ? "previousMonthBalance"
        : "previousMonthSavings";

    let tag = tags[previousMonthTagId];

    // Create tag if missing

    if (!tag) {
      const selectedColor =
        choice === TransactionEnum.INCOME
          ? colorList.find((item) => item.color === "bg-primary text-dark")
          : colorList.find((item) => item.color === "bg-secondary text-dark");

      createTag({
        id: previousMonthTagId,
        name: tagName,
        transactionType: choice,
        icon: DEFAULT_ICON_PREV_ID,
        color: selectedColor ?? colorList[0],
      });

      tag = useTagsStore.getState().tags[previousMonthTagId];
    }

    if (!tag) {
      console.error("Previous month tag was not created");
      return;
    }

    addTransaction({
      id: crypto.randomUUID(),
      amount: balance.toString(),
      tag: tag.id,
      date: new Date().toISOString(),
      description: tagDescription,
      systemKey:
        choice === TransactionEnum.INCOME
          ? "previous_month_balance"
          : "previous_month_savings",
    });

    answer(choice);
  };

  return (
    <PreviousBalanceModal
      open={showModal}
      balance={balance}
      onSubmit={handleSubmit}
    />
  );
}

"use client";

import { colorList } from "@/constant/colors";
import { usePreviousBalanceQuestion } from "@/hooks/usePreviousBalanceQuestion";
import { useTagsStore } from "@/store/tags";
import { useTransactionStore } from "@/store/transaction";
import { TransactionEnum } from "@/types/global";
import PreviousBalanceModal from "./previousBalanceModal";
import { SYSTEM_TAG } from "@/constant/global";

export default function PreviousBalanceChecker({
  previousBalance,
}: {
  previousBalance: number;
}) {
  const { showModal, balance, answer } =
    usePreviousBalanceQuestion(previousBalance);

  const { addTransaction } = useTransactionStore();

  const { tags, createTag } = useTagsStore();

  const handleSubmit = (
    choice: TransactionEnum.INCOME | TransactionEnum.SAVE | "skip",
  ) => {
    if (choice === "skip") {
      answer(choice);
      return;
    }
    const tagName = SYSTEM_TAG;

    const tagDescription =
      choice === TransactionEnum.INCOME
        ? "previousMonthBalance"
        : "previousMonthSavings";

    let tag = Object.values(tags).find(
      (item) => item.name === tagName && item.transactionType === choice,
    );

    // Create tag if missing

    if (!tag) {
      const selectedColor =
        choice === TransactionEnum.INCOME
          ? colorList.find((item) => item.color === "bg-primary text-dark")
          : colorList.find((item) => item.color === "bg-secondary text-dark");

      createTag({
        id: crypto.randomUUID(),
        name: tagName,
        transactionType: choice,
        icon: "",
        color: selectedColor ?? colorList[0],
      });

      tag = Object.values(useTagsStore.getState().tags).find(
        (item) => item.name === tagName && item.transactionType === choice,
      );
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

"use client";

import { usePreviousBalanceQuestionStore } from "@/store/home/previousBalanceQuestion";
import { TransactionEnum } from "@/types/global";

export function usePreviousBalanceQuestion(previousBalance: number) {
  const { answeredMonth, saveAnswer } = usePreviousBalanceQuestionStore();

  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}`;

  const shouldShow = previousBalance > 0 && answeredMonth !== currentMonth;

  const answer = (
    choice: TransactionEnum.SAVE | TransactionEnum.INCOME | "skip",
  ) => {
    saveAnswer(currentMonth, choice);
  };

  return {
    showModal: shouldShow,

    balance: previousBalance,

    answer,
  };
}

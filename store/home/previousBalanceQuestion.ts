"use client";

import { TransactionEnum } from "@/types/global";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PreviousBalanceChoice =
  | TransactionEnum.INCOME
  | TransactionEnum.SAVE
  | "skip"
  | null;

interface PreviousBalanceQuestionStore {
  answeredMonth: string | null;

  choice: PreviousBalanceChoice;

  saveAnswer: (month: string, choice: PreviousBalanceChoice) => void;

  reset: () => void;
}

export const usePreviousBalanceQuestionStore =
  create<PreviousBalanceQuestionStore>()(
    persist(
      (set) => ({
        answeredMonth: null,

        choice: null,

        saveAnswer: (month, choice) =>
          set({
            answeredMonth: month,
            choice,
          }),

        reset: () =>
          set({
            answeredMonth: null,
            choice: null,
          }),
      }),
      {
        name: "previous-balance-question",
      },
    ),
  );

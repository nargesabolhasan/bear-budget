import useCalendarUtils from "@/hooks/useCalendarUtils";
import { usePreviousBalanceQuestionStore } from "@/store/home/previousBalanceQuestion";
import { TransactionEnum } from "@/types/global";

export function usePreviousBalanceQuestion(previousBalance: number) {
  const { answeredMonth, saveAnswer } = usePreviousBalanceQuestionStore();

  const { getCurrentYear, getCurrentMonthNumber } = useCalendarUtils();

  const currentMonthKey = `${getCurrentYear()}-${String(
    getCurrentMonthNumber(),
  ).padStart(2, "0")}`;

  const shouldShow = previousBalance > 0 && answeredMonth !== currentMonthKey;

  const answer = (
    choice: TransactionEnum.SAVE | TransactionEnum.INCOME | "skip",
  ) => {
    saveAnswer(currentMonthKey, choice);
  };

  return {
    showModal: shouldShow,
    balance: previousBalance,
    answer,
  };
}

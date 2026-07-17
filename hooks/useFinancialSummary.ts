import { useFeaturePreferenceStore } from "@/store/home/preferenceCheckboxes";
import { GroupedTransactionType } from "@/store/transaction/type";
import { TransactionEnum } from "@/types/global";

export function useFinancialSummary(data: GroupedTransactionType) {
  const { saveTarget, debtTarget, creditTarget } = useFeaturePreferenceStore();

  const rawIncome = data.Income?.totalAmount ?? 0;
  const rawExpense = data.Expense?.totalAmount ?? 0;

  let income = rawIncome;
  let outgoing = rawExpense;

  if (saveTarget === TransactionEnum.INCOME) {
    income += data.Save?.totalAmount ?? 0;
  } else if (saveTarget === TransactionEnum.EXPENSE) {
    outgoing += data.Save?.totalAmount ?? 0;
  }

  if (debtTarget === TransactionEnum.INCOME) {
    income += data.Debt?.totalAmount ?? 0;
  } else if (debtTarget === TransactionEnum.EXPENSE) {
    outgoing += data.Debt?.totalAmount ?? 0;
  }

  if (creditTarget === TransactionEnum.INCOME) {
    income += data.Credit?.totalAmount ?? 0;
  } else if (creditTarget === TransactionEnum.EXPENSE) {
    outgoing += data.Credit?.totalAmount ?? 0;
  }

  return {
    income,
    outgoing,
    remaining: income - outgoing,
    save: data.Save?.totalAmount ?? 0,
  };
}

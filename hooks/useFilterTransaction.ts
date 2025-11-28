import { useTransactionStore } from "@/store/transaction";
import { useBudgetStore } from "@/store/budget";
import { getCurrentYear } from "@/utils/dateList";
import { useMemo } from "react";
import { TransactionType } from "@/types/global";

type Props = {
  monthList: Array<string>;
  filterMonth: string;
};

const useFilterTransaction = ({ monthList, filterMonth }: Props) => {
  const { transactions } = useTransactionStore();
  const { budgets } = useBudgetStore();

  const filteredTransactions = useMemo(() => {
    const map = new Map<
      string,
      {
        transactions: TransactionType[];
        totalAmount: number;
        tag: {
          name: string;
          icon: string;
          color: string;
        };
      }
    >();

    if (!filterMonth) return map;

    /** ----------------------------------------------------
     * 1) ADD ALL BUDGETS FOR THIS MONTH (even if no transaction)
     * ---------------------------------------------------- */
    for (const [id, budget] of Object.entries(budgets)) {
      if (budget.month === filterMonth) {
        map.set(id, {
          transactions: [],
          totalAmount: 0,
          tag: {
            name: budget.tag.name,
            icon: budget.tag.icon,
            color: budget.tag.color,
          },
        });
      }
    }

    /** ----------------------------------------------------
     * 2) MERGE TRANSACTIONS (if they exist)
     * ---------------------------------------------------- */
    for (const transaction of transactions) {
      const date = new Date(transaction.date);

      const isSameMonth = monthList[date.getMonth()] === filterMonth;
      const isSameYear = date.getFullYear() === getCurrentYear("fa");
      if (!isSameMonth || !isSameYear) continue;

      const tagId = transaction.tag?.id;
      if (!tagId) continue;

      // if budget exists → merge
      if (map.has(tagId)) {
        const group = map.get(tagId)!;
        group.transactions.push(transaction);
        group.totalAmount += parseInt(transaction.amount);
      }
    }

    return map;
  }, [filterMonth, transactions, budgets]);

  return { filteredTransactions };
};

export default useFilterTransaction;

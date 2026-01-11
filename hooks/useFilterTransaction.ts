import { useTransactionStore } from "@/store/transaction";
import { useBudgetStore } from "@/store/budget";
import { useMemo } from "react";
import { TransactionType } from "@/types/global";
import { TagsListType } from "@/store/tags/type";

type Props = {
  isoDate: { year: number; month: number };
  notIsoMonth: number;
  tags: TagsListType;
  isJalali: boolean;
};

const useFilterTransaction = ({
  isoDate,
  notIsoMonth,
  tags,
  isJalali,
}: Props) => {
  const { getTransactions } = useTransactionStore();
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

    if (!isoDate) return map;
    /** ----------------------------------------------------
     * 1) ADD ALL BUDGETS FOR THIS MONTH (even if no transaction)
     * ---------------------------------------------------- */
    if (budgets?.[isoDate.month]) {
      for (const [tagId, budget] of Object.entries(budgets?.[isoDate.month])) {
        map.set(tagId, {
          transactions: [],
          totalAmount: 0,
          tag: {
            name: tags?.[tagId]?.name,
            icon: tags?.[tagId]?.icon,
            color: tags?.[tagId]?.color.color,
          },
        });
      }
    }

    /** ----------------------------------------------------
     * 2) MERGE TRANSACTIONS (if they exist)
     * ---------------------------------------------------- */

    for (const transaction of getTransactions(
      isoDate.year,
      isoDate.month,
      isJalali,
      notIsoMonth
    )) {
      const tagId = transaction.tag;
      if (!tagId) continue;

      if (map.has(tagId)) {
        const group = map.get(tagId)!;
        group.transactions.push(transaction);
        group.totalAmount += parseInt(transaction.amount);
      }
    }

    return map;
  }, [isoDate, budgets]);

  return { filteredTransactions };
};

export default useFilterTransaction;

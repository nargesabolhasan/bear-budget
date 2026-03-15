"use client";

import React from "react";
import useFilterTransaction from "@/hooks/useFilterTransaction";
import { useBudgetStore } from "@/store/budget";
import { useTagsStore } from "@/store/tags";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18next from "i18next";
import { convertToCurrency } from "@/utils/utils";

const BudgetInfoList = () => {
  const { budgets } = useBudgetStore();
  const { tags } = useTagsStore();

  const { getCurrentMonthNumber, getCurrentYear, isJalali, toStandardISO } =
    useCalendarUtils();

  const isoDate = toStandardISO({
    year: getCurrentYear(),
    month: getCurrentMonthNumber(),
  });

  const { filteredTransactions } = useFilterTransaction({
    tags,
    notIsoMonth: getCurrentMonthNumber(),
    isoDate,
    isJalali,
  });

  return (
    <section
      className={
        "border border-placeholder_light2 border-dashed w-full p-4 rounded-2xl"
      }
    >
      <table className={"w-full"} cellSpacing={5}>
        <thead>
          <tr>
            <th>name</th>
            <th>budget</th>
            <th>spent</th>
            <th>remind</th>
            <th>usage</th>
          </tr>
        </thead>
        <tbody>
          {[...filteredTransactions]?.map(([tagId, { totalAmount: spent }]) => {
            const budget = budgets?.[isoDate.month]?.[tagId];
            const budgetAmount = parseInt(budget?.amount);
            const remining = budgetAmount - spent;
            const usagePercent =
              Math.min((spent / budgetAmount) * 100, 100) || 0;
            return (
              <tr key={`balance-budget-summery-${tagId}`}>
                <td>{tags?.[tagId]?.name}</td>
                <td>{convertToCurrency(budgetAmount)}</td>
                <td>{convertToCurrency(spent)}</td>
                <td>{convertToCurrency(remining)}</td>
                <td>
                  {i18next.t("setting.usage")}: {usagePercent}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default BudgetInfoList;

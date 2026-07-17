"use client";

import React from "react";
import useFilterTransaction from "@/hooks/useFilterTransaction";
import { useBudgetStore } from "@/store/budget";
import { useTagsStore } from "@/store/tags";
import useCalendarUtils from "@/hooks/useCalendarUtils";
import i18next from "i18next";
import { convertToCurrency } from "@/utils/utils";
import { PrintInfoProps } from "@/components/core-components/print-summery/printInfo";

const BudgetInfoList = ({ selectedDate }: PrintInfoProps) => {
  const { budgets } = useBudgetStore();
  const { tags } = useTagsStore();

  const { isJalali } = useCalendarUtils();

  const { filteredTransactions } = useFilterTransaction({
    tags,
    notIsoMonth: selectedDate.month,
    isoDate: { year: selectedDate.isoYear, month: selectedDate.isoMonth },
    isJalali,
  });
  const th = [
    { id: 1, title: i18next.t("global.name") },
    { id: 2, title: i18next.t("global.budget") },
    { id: 3, title: i18next.t("budgets.spent") },
    { id: 4, title: i18next.t("budgets.remining") },
  ];
  return (
    <section
      className={
        "border border-placeholder_light2 border-dashed w-full p-2 md:p-4 rounded-2xl"
      }
    >
      <table className={"w-full text-xs md:text-md"} cellSpacing={5}>
        <thead>
          <tr>
            {th.map((item) => (
              <th key={item.id}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...filteredTransactions]?.map(([tagId, { totalAmount: spent }]) => {
            const budget = budgets?.[selectedDate.isoMonth]?.[tagId];
            const budgetAmount = parseInt(budget?.amount);
            const remining = budgetAmount - spent;

            return (
              <tr key={`balance-budget-summery-${tagId}`}>
                <td>{tags?.[tagId]?.name}</td>
                <td>{convertToCurrency(budgetAmount)}</td>
                <td>{convertToCurrency(spent)}</td>
                <td dir={"ltr"}>{convertToCurrency(remining)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default BudgetInfoList;

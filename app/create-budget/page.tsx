"use client";
import React from "react";
import CreateBudget from "@/components/create-budget";
import { BudgetType } from "@/types/global";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budget";
import i18next from "i18next";

const Page = () => {
  const { addBudget } = useBudgetStore();

  const onSubmit = (formData: Omit<BudgetType, "id">) => {
    addBudget({ id: formData.tag, ...formData });
    toast.success(
      <span>
        {i18next.t("global.successValue", {
          value: i18next.t("global.budget"),
        })}
      </span>
    );
  };

  return (
    <div>
      <CreateBudget onSubmit={onSubmit} />
    </div>
  );
};

export default Page;

"use client";

import React, { use } from "react";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budget";
import { BudgetType } from "@/types/global";
import { FormBudgetTypeEnum } from "@/components/create-budget/types";
import CreateBudget from "@/components/create-budget";

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = ({ params }: Props) => {
  const { slug } = use(params);
  const { budgets, editBudget } = useBudgetStore();
  const defaultValue = budgets[slug];

  const onSubmit = (formData: Omit<BudgetType, "id">) => {
    if (!defaultValue) return;
    editBudget(defaultValue.id, formData);
    toast.success(
      <span>
        <strong>{formData[FormBudgetTypeEnum.TAG].name}</strong> was updated
        successfully!
      </span>
    );
  };

  return (
    <div>
      <CreateBudget onSubmit={onSubmit} defaultValue={defaultValue} />
    </div>
  );
};

export default Page;

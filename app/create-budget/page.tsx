"use client";
import React from "react";
import CreateBudget from "@/components/create-budget";
import { BudgetType } from "@/types/global";
import { toast } from "sonner";
import { FormBudgetTypeEnum } from "@/components/create-budget/types";
import { useBudgetStore } from "@/store/budget";

const Page = () => {
  const { addBudget } = useBudgetStore();

  const onSubmit = (formData: Omit<BudgetType, "id">) => {
    addBudget({ id: formData.tag.id, ...formData });
    toast.success(
      <span>
        <strong>Budget for {formData[FormBudgetTypeEnum.TAG].name}</strong>{" "}
        generated successfully!!
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

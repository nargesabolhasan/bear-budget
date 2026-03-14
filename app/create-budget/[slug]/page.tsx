"use client";

import React, { use } from "react";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budget";
import { BudgetType } from "@/types/global";
import CreateBudget from "@/components/inner-components/create-budget";
import { useRouter } from "next/navigation";
import i18next from "i18next";

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = ({ params }: Props) => {
  const { slug: param } = use(params);
  const { budgets, editBudget } = useBudgetStore();
  const router = useRouter();
  const slug = param.split("MONTH");

  const id = slug[0];
  const selectedMonth = slug[1];

  const defaultValue = budgets?.[selectedMonth]?.[id];

  const onSubmit = (formData: BudgetType) => {
    if (!defaultValue) return;
    editBudget(formData.tag, id, parseInt(selectedMonth), formData);
    toast.success(
      <span>
        {i18next.t("global.updateValue", {
          value: i18next.t("global.budget"),
        })}
      </span>
    );
    router.back();
  };

  return (
    <div>
      <CreateBudget onSubmit={onSubmit} defaultValue={defaultValue} />
    </div>
  );
};

export default Page;

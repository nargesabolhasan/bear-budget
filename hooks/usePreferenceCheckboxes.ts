"use client";

import { useFeaturePreferenceStore } from "@/store/home/preferenceCheckboxes";
import { TargetType, TargetUnion } from "@/store/home/type";
import { TransactionEnum } from "@/types/global";
import { transactionPreferenceIcon } from "@/utils/transactionTypeIcon";
import { useTranslation } from "react-i18next";

export function usePreferenceCheckboxes() {
  const store = useFeaturePreferenceStore();
  const { t } = useTranslation();

  const createCheckbox = (
    label: string,
    target: TargetUnion,
    value: TargetType,
    icon: React.JSX.Element | undefined,
  ) => ({
    label,
    type: value,
    checked: store[target] === value,
    icon,
    id: `${label}-${value}`,
    onChange: (checked: boolean) => {
      store.setPreference(target, checked ? value : null);
    },
  });

  return [
    createCheckbox(
      t("transactions.Save"),
      TargetUnion.SAVE_TARGET,
      TransactionEnum.INCOME,
      transactionPreferenceIcon(TransactionEnum.SAVE, "text-hover_primary"),
    ),
    createCheckbox(
      t("transactions.Debt"),
      TargetUnion.DEBT_TARGET,
      TransactionEnum.INCOME,
      transactionPreferenceIcon(TransactionEnum.DEBT, "text-hover_primary"),
    ),
    createCheckbox(
      t("transactions.Credit"),
      TargetUnion.CREDIT_TARGET,
      TransactionEnum.INCOME,
      transactionPreferenceIcon(TransactionEnum.CREDIT, "text-hover_primary"),
    ),
    //expense
    createCheckbox(
      t("transactions.Save"),
      TargetUnion.SAVE_TARGET,
      TransactionEnum.EXPENSE,
      transactionPreferenceIcon(TransactionEnum.SAVE, "text-secondary"),
    ),
    createCheckbox(
      t("transactions.Debt"),
      TargetUnion.DEBT_TARGET,
      TransactionEnum.EXPENSE,
      transactionPreferenceIcon(TransactionEnum.DEBT, "text-secondary"),
    ),
    createCheckbox(
      t("transactions.Credit"),
      TargetUnion.CREDIT_TARGET,
      TransactionEnum.EXPENSE,
      transactionPreferenceIcon(TransactionEnum.CREDIT, "text-secondary"),
    ),
  ];
}

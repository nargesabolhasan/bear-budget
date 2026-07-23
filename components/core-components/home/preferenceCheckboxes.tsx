"use client";

import ICheckbox from "@/components/atoms/checkbox";
import { usePreferenceCheckboxes } from "@/hooks/usePreferenceCheckboxes";
import { TransactionEnum } from "@/types/global";
import { useTranslation } from "react-i18next";

const PreferenceCheckboxes = () => {
  const items = usePreferenceCheckboxes();
  const { t } = useTranslation();

  const incomeItems = items.filter(
    (item) => item.type === TransactionEnum.INCOME,
  );

  const expenseItems = items.filter(
    (item) => item.type === TransactionEnum.EXPENSE,
  );

  const renderGroup = (title: string, data: typeof items) => (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-dark">{title}</span>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <label
            htmlFor={`pref-${item.id}`}
            key={`${item.label}-${item.id}`}
            className="text-dark_surface bg-neutral hover:bg-placeholder_dark flex cursor-pointer items-center gap-3 rounded-3xl p-2 transition"
          >
            <div className="flex h-8 w-8 items-center justify-center">
              {item.icon}
            </div>
            <ICheckbox
              id={`pref-${item.id}`}
              checked={item.checked}
              onChange={item.onChange}
              label={item.label}
              color="primary"
            />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-primary_light my-3 w-full rounded-4xl p-5 print:hidden">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-dark font-semibold">
            {t("home.transactionPreference")}
          </h3>
          <p className="text-dark mt-1 text-sm opacity-70">
            {t("home.transactionPreferenceDescription")}
          </p>
        </div>
        {renderGroup(t("home.countAsIncome"), incomeItems)}
        {renderGroup(t("home.countAsExpense"), expenseItems)}
      </div>
    </section>
  );
};

export default PreferenceCheckboxes;

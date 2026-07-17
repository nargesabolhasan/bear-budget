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
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-dark">{title}</span>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <label
            htmlFor={`pref-${item.id}`}
            key={`${item.label}-${item.id}`}
            className="cursor-pointer flex items-center gap-3 text-dark_surface rounded-3xl bg-neutral p-2 hover:bg-placeholder_dark transition"
          >
            <div className="w-8 h-8 flex items-center justify-center">
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
    <section className="print:hidden w-full p-5 bg-primary_light rounded-4xl my-3">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-semibold text-dark">
            {t("home.transactionPreference")}
          </h3>
          <p className="text-sm opacity-70 mt-1 text-dark">
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

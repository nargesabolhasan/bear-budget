import React from "react";
import i18next from "i18next";
import { convertToCurrency } from "@/utils/utils";

type Props = {
  budgetAmount: number;
  spent: number;
  remining: number;
};

const TransactionBalance = ({ budgetAmount, spent, remining }: Props) => {
  return (
    <section
      className={"grid grid-cols-3 items-start gap-4 text-sm md:text-md"}
    >
      <span className={"flex flex-col lg:flex-row gap-2"}>
        <span
          className={"text-placeholder"}
          style={{
            fontFamily:
              i18next.language === "en-US"
                ? "PlaywriteNZGuides"
                : "playpenSansArabic",
          }}
        >
          {i18next.t("global.budget")}
        </span>
        {convertToCurrency(budgetAmount)}
      </span>
      <span className={"flex flex-col lg:flex-row gap-2"}>
        <span
          className={"text-placeholder"}
          style={{
            fontFamily:
              i18next.language === "en-US"
                ? "PlaywriteNZGuides"
                : "playpenSansArabic",
          }}
        >
          {i18next.t("budgets.spent")}
        </span>
        {convertToCurrency(spent)}
      </span>
      <span className={"flex flex-col lg:flex-row gap-2"}>
        <span
          className={"text-placeholder"}
          style={{
            fontFamily:
              i18next.language === "en-US"
                ? "PlaywriteNZGuides"
                : "playpenSansArabic",
          }}
        >
          {i18next.t("budgets.remining")}
        </span>
        <span dir={"ltr"}>{convertToCurrency(remining)}</span>
      </span>
    </section>
  );
};

export default TransactionBalance;
